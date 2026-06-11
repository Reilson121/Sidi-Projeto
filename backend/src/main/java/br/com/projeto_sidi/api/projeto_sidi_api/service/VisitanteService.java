package br.com.projeto_sidi.api.projeto_sidi_api.service;

import br.com.projeto_sidi.api.projeto_sidi_api.dto.VisitanteDTO;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.StatusCadastro;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.TipoPerfil;
import br.com.projeto_sidi.api.projeto_sidi_api.model.Visitante;
import br.com.projeto_sidi.api.projeto_sidi_api.repository.VisitanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.Setor;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VisitanteService {

    @Autowired
    private VisitanteRepository visitanteRepository;

    public VisitanteDTO criar(VisitanteDTO dto) {
        Visitante visitante = converterParaEntidade(dto);
        visitante.setTipoPerfil(TipoPerfil.VISITANTE);
        visitante.setStatus(StatusCadastro.PENDENTE);
        visitante = visitanteRepository.save(visitante);
        return converterParaDTO(visitante);
    }

    public List<VisitanteDTO> listarTodos() {
        return visitanteRepository.findAll()
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public VisitanteDTO buscarPorId(Long id) {
        Visitante visitante = visitanteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitante não encontrado: " + id));
        return converterParaDTO(visitante);
    }

    public VisitanteDTO atualizarStatus(Long id, StatusCadastro status) {
        Visitante visitante = visitanteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitante não encontrado: " + id));
        visitante.setStatus(status);
        visitante = visitanteRepository.save(visitante);
        return converterParaDTO(visitante);
    }

    public List<VisitanteDTO> listarPorSetor(Setor setor) {
        return visitanteRepository.findBySetor(setor)
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public List<VisitanteDTO> listarPendentes() {
        return visitanteRepository.findByStatus(StatusCadastro.PENDENTE)
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    private Visitante converterParaEntidade(VisitanteDTO dto) {
        Visitante visitante = new Visitante();
        visitante.setNome(dto.getNome());
        visitante.setEmail(dto.getEmail());
        visitante.setEmpresa(dto.getEmpresa());
        visitante.setCpf(dto.getCpf());
        visitante.setTelefone(dto.getTelefone());
        visitante.setQuemConvidou(dto.getQuemConvidou());
        visitante.setSetor(dto.getSetor());
        visitante.setQntdVisitantes(dto.getQntdVisitantes());
        visitante.setData(dto.getData());
        visitante.setHorario(dto.getHorario());
        visitante.setTipoVisitante(dto.getTipoVisitante());
        visitante.setPlacaVeiculo(dto.getPlacaVeiculo());
        visitante.setObservacao(dto.getObservacao());
        return visitante;
    }

    private VisitanteDTO converterParaDTO(Visitante visitante) {
        VisitanteDTO dto = new VisitanteDTO();
        dto.setId(visitante.getId());
        dto.setNome(visitante.getNome());
        dto.setEmail(visitante.getEmail());
        dto.setEmpresa(visitante.getEmpresa());
        dto.setCpf(visitante.getCpf());
        dto.setTelefone(visitante.getTelefone());
        dto.setQuemConvidou(visitante.getQuemConvidou());
        dto.setSetor(visitante.getSetor());
        dto.setQntdVisitantes(visitante.getQntdVisitantes());
        dto.setData(visitante.getData());
        dto.setHorario(visitante.getHorario());
        dto.setTipoPerfil(visitante.getTipoPerfil());
        dto.setStatus(visitante.getStatus());
        dto.setTipoVisitante(visitante.getTipoVisitante());
        dto.setPlacaVeiculo(visitante.getPlacaVeiculo());
        dto.setObservacao(visitante.getObservacao());
        return dto;
    }
}
