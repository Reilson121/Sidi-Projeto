package br.com.projeto_sidi.api.projeto_sidi_api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto_sidi.api.projeto_sidi_api.dto.VisitanteDTO;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.Setor;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.StatusCadastro;
import br.com.projeto_sidi.api.projeto_sidi_api.service.VisitanteService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/visitantes")
public class VisitanteController {

    @Autowired
    private VisitanteService visitanteService;

    @PostMapping
    public ResponseEntity<VisitanteDTO> criar( @Valid @RequestBody VisitanteDTO dto) {
        return ResponseEntity.ok(visitanteService.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<VisitanteDTO>> listarTodos() {
        return ResponseEntity.ok(visitanteService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitanteDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(visitanteService.buscarPorId(id));
    }

    @GetMapping("/pendentes")
    public ResponseEntity<List<VisitanteDTO>> listarPendentes() {
        return ResponseEntity.ok(visitanteService.listarPendentes());
    }

    @GetMapping("/setor/{setor}")
    public ResponseEntity<List<VisitanteDTO>> listarPorSetor(@PathVariable Setor setor) {
        return ResponseEntity.ok(visitanteService.listarPorSetor(setor));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<VisitanteDTO> atualizarStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        StatusCadastro status = StatusCadastro.valueOf(body.get("status"));
        return ResponseEntity.ok(visitanteService.atualizarStatus(id, status));
    }
}
