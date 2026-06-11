package br.com.projeto_sidi.api.projeto_sidi_api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "respostas_ia")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RespostaIA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String sugestao;

    @Column(nullable = false, length = 1000)
    private String orientacao;

    private String alerta;

    @Column(nullable = false)
    private double confianca;

    @Column(nullable = false)
    private boolean requerAtencao;

    public String getSugestao() {
        return sugestao;
    }

    public String getOrientacao() {
        return orientacao;
    }

    public boolean isRequerAtencao() {
        return requerAtencao;
    }
}
