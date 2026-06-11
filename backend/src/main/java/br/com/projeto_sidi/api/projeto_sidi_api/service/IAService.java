package br.com.projeto_sidi.api.projeto_sidi_api.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class IAService {

    @Value("${gemini.api.key}")
    private String chaveApi;

    private static final String PROMPT_SISTEMA = """
            Você é a assistente virtual do VisitControl, sistema de pré-cadastro de visitantes do SIDI.
            Sua função é ajudar visitantes a preencherem o formulário de cadastro de forma clara e objetiva.

            INFORMAÇÕES DO SISTEMA:
            - O formulário tem 5 etapas: Dados Pessoais, Dados da Visita, Informações Adicionais, Aceite LGPD e Revisão

            CAMPOS OBRIGATÓRIOS:
            - Nome completo
            - CPF (somente 11 números, sem pontos ou traços)
            - Telefone no formato (DDD) 9XXXX-XXXX
            - E-mail
            - Empresa
            - Quem convidou (nome do colaborador que fez o convite)
            - Setor de destino
            - Quantidade de visitantes
            - Data da visita
            - Horário da visita
            - Tipo de visita

            SETORES DISPONÍVEIS: TI, Recursos Humanos, Financeiro, Comercial, Operações, Diretoria

            TIPOS DE VISITA: Entrevista, Fornecedor, Prestador de Serviço, Visitante

            CAMPOS OPCIONAIS: Placa do veículo, Observações

            REGRAS IMPORTANTES:
            - CPF deve ter exatamente 11 dígitos numéricos
            - Telefone deve seguir o formato (DDD) 9XXXX-XXXX
            - A visita precisa ser agendada com data e horário definidos
            - Após o envio, o cadastro ficará com status PENDENTE até a aprovação de um colaborador

            INSTRUÇÕES:
            - Responda SEMPRE em português
            - Seja breve, claro e amigável — máximo 3 frases por resposta
            - Se a pergunta não for sobre o formulário ou o sistema VisitControl, diga educadamente que só pode ajudar com o cadastro
            - Não invente informações que não estejam listadas acima
            """;

    public String perguntarIA(String mensagem, List<Map<String, String>> historico) {

        try {

            RestTemplate restTemplate = new RestTemplate();

            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + chaveApi;

            HttpHeaders cabecalhos = new HttpHeaders();
            cabecalhos.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> corpo = new HashMap<>();
            List<Map<String, Object>> conteudos = new ArrayList<>();

            // Instrução do sistema como primeira mensagem
            Map<String, Object> instrucaoSistema = new HashMap<>();
            instrucaoSistema.put("role", "user");
            instrucaoSistema.put("parts", List.of(Map.of("text", PROMPT_SISTEMA)));
            conteudos.add(instrucaoSistema);

            // Confirmação do modelo
            Map<String, Object> confirmacaoSistema = new HashMap<>();
            confirmacaoSistema.put("role", "model");
            confirmacaoSistema.put("parts", List.of(Map.of("text", "Entendido! Estou pronto para ajudar os visitantes a preencherem o formulário do VisitControl.")));
            conteudos.add(confirmacaoSistema);

            // Histórico da conversa
            if (historico != null) {

                for (Map<String, String> item : historico) {

                    String papel = item.get("papel");
                    String texto = item.get("texto");

                    if (papel == null || texto == null) continue;

                    // Ignora a mensagem de boas-vindas inicial do assistente
                    if (papel.equals("assistente") && texto.startsWith("Olá! Sou a assistente")) continue;

                    Map<String, Object> entrada = new HashMap<>();
                    entrada.put("role", papel.equals("usuario") ? "user" : "model");
                    entrada.put("parts", List.of(Map.of("text", texto)));

                    conteudos.add(entrada);
                }
            }

            // Mensagem atual do usuário
            Map<String, Object> mensagemUsuario = new HashMap<>();
            mensagemUsuario.put("role", "user");
            mensagemUsuario.put("parts", List.of(Map.of("text", mensagem)));
            conteudos.add(mensagemUsuario);

            corpo.put("contents", conteudos);

            // Configuração para economizar cota da API gratuita
            Map<String, Object> configuracaoGeracao = new HashMap<>();
            configuracaoGeracao.put("maxOutputTokens", 256);
            configuracaoGeracao.put("temperature", 0.7);
            corpo.put("generationConfig", configuracaoGeracao);

            HttpEntity<Map<String, Object>> entidade = new HttpEntity<>(corpo, cabecalhos);

            ResponseEntity<Map> resposta = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entidade,
                    Map.class
            );

            // Extrair o texto da resposta
            Map<String, Object> corpoResposta = resposta.getBody();

            if (corpoResposta != null) {

                List<Map<String, Object>> candidatos = (List<Map<String, Object>>) corpoResposta.get("candidates");

                if (candidatos != null && !candidatos.isEmpty()) {

                    Map<String, Object> candidato = candidatos.get(0);
                    Map<String, Object> conteudo = (Map<String, Object>) candidato.get("content");

                    if (conteudo != null) {

                        List<Map<String, String>> partes = (List<Map<String, String>>) conteudo.get("parts");

                        if (partes != null && !partes.isEmpty()) {
                            return partes.get(0).get("text");
                        }
                    }
                }
            }

            return "Não consegui gerar uma resposta. Tente novamente.";

        } catch (Exception e) {

            System.err.println("Erro IA Gemini: " + e.getClass().getName() + " - " + e.getMessage());
            e.printStackTrace();

            return "Erro ao conectar com a IA. Tente novamente em instantes.";
        }
    }
}