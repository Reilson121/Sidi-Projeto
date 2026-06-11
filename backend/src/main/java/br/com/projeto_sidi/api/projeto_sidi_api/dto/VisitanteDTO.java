package br.com.projeto_sidi.api.projeto_sidi_api.dto;

import br.com.projeto_sidi.api.projeto_sidi_api.enums.Setor;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.StatusCadastro;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.TipoPerfil;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.TipoVisitante;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VisitanteDTO {
    
    private Long id;
    private String nome;
    private String email;
    private String empresa;
   @Pattern(regexp = "\\d{11}", message = "CPF deve conter exatamente 11 dígitos numéricos")
    private String cpf;
    private String telefone;
    private String quemConvidou;
    private Setor setor;
    private Integer qntdVisitantes;
    private String data;
    private String horario;
    private TipoPerfil tipoPerfil;
    private StatusCadastro status;
    private TipoVisitante tipoVisitante;
    private String placaVeiculo;
    private String observacao;
}