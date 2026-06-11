package br.com.projeto_sidi.api.projeto_sidi_api.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private String apiKey;

    public String perguntarIA(String mensagem) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            
            String url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=" + apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Montar o corpo da requisição
            Map<String, Object> body = new HashMap<>();

            List<Map<String, Object>> contents = new ArrayList<>();

            Map<String, Object> content = new HashMap<>();
            List<Map<String, String>> parts = new ArrayList<>();

            // Instrução do sistema
            parts.add(Map.of("text", """
                Você é uma assistente virtual do sistema SIDI.
                Sua função é ajudar usuários a preencher formulários de pré-cadastro de visitantes.
                Responda de forma curta, clara e amigável em português.
                """
            ));

            // Mensagem do usuário
            parts.add(Map.of("text", mensagem));

            content.put("parts", parts);
            contents.add(content);
            body.put("contents", contents);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            // Extrair a resposta
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> candidate = candidates.get(0);
                    Map<String, Object> contentMap = (Map<String, Object>) candidate.get("content");
                    if (contentMap != null) {
                        List<Map<String, String>> responseParts = (List<Map<String, String>>) contentMap.get("parts");
                        if (responseParts != null && !responseParts.isEmpty()) {
                            return responseParts.get(0).get("text");
                        }
                    }
                }
            }

            return "Resposta vazia da IA.";

        } catch (Exception e) {
            System.err.println("Erro IA Gemini: " + e.getClass().getName() + " - " + e.getMessage());
            e.printStackTrace();
            return "Erro ao conectar com a IA: " + e.getMessage();
        }
    }
}
