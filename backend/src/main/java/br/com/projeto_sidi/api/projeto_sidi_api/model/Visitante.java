package br.com.projeto_sidi.api.projeto_sidi_api.model;

import br.com.projeto_sidi.api.projeto_sidi_api.enums.Setor;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.StatusCadastro;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.TipoPerfil;
import jakarta.validation.constraints.Pattern;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.TipoVisitante;
import jakarta.persistence.*;

@Entity
@Table(name = "tb_visitante")
public class Visitante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String email;

    private String empresa;

    @Column(nullable = false, length = 11)
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter exatamente 11 dígitos numéricos")
    private String cpf;

    private String telefone;

    @Column(name = "quem_convidou")
    private String quemConvidou;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Setor setor;

    @Column(name = "qntd_visitantes")
    private Integer qntdVisitantes;

    private String data;

    private String horario;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_perfil", nullable = false)
    private TipoPerfil tipoPerfil = TipoPerfil.VISITANTE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusCadastro status = StatusCadastro.PENDENTE;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_visitante")
    private TipoVisitante tipoVisitante;

    @Column(name = "placa_veiculo")
    private String placaVeiculo;

    @Column(length = 1000)
    private String observacao;

    // Construtores
    public Visitante() {
    }

    public Visitante(Long id, String nome, String email, String empresa, String cpf,
            String telefone, String quemConvidou, Setor setor,
            Integer qntdVisitantes, String data, String horario,
            TipoPerfil tipoPerfil, StatusCadastro status,
            TipoVisitante tipoVisitante, String placaVeiculo, String observacao) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.empresa = empresa;
        this.cpf = cpf;
        this.telefone = telefone;
        this.quemConvidou = quemConvidou;
        this.setor = setor;
        this.qntdVisitantes = qntdVisitantes;
        this.data = data;
        this.horario = horario;
        this.tipoPerfil = tipoPerfil;
        this.status = status;
        this.tipoVisitante = tipoVisitante;
        this.placaVeiculo = placaVeiculo;
        this.observacao = observacao;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getQuemConvidou() {
        return quemConvidou;
    }

    public void setQuemConvidou(String quemConvidou) {
        this.quemConvidou = quemConvidou;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

    public Integer getQntdVisitantes() {
        return qntdVisitantes;
    }

    public void setQntdVisitantes(Integer qntdVisitantes) {
        this.qntdVisitantes = qntdVisitantes;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public TipoPerfil getTipoPerfil() {
        return tipoPerfil;
    }

    public void setTipoPerfil(TipoPerfil tipoPerfil) {
        this.tipoPerfil = tipoPerfil;
    }

    public StatusCadastro getStatus() {
        return status;
    }

    public void setStatus(StatusCadastro status) {
        this.status = status;
    }

    public TipoVisitante getTipoVisitante() {
        return tipoVisitante;
    }

    public void setTipoVisitante(TipoVisitante tipoVisitante) {
        this.tipoVisitante = tipoVisitante;
    }

    public String getPlacaVeiculo() {
        return placaVeiculo;
    }

    public void setPlacaVeiculo(String placaVeiculo) {
        this.placaVeiculo = placaVeiculo;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
}
