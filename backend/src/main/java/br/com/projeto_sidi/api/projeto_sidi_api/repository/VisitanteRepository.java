package br.com.projeto_sidi.api.projeto_sidi_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projeto_sidi.api.projeto_sidi_api.enums.Setor;
import br.com.projeto_sidi.api.projeto_sidi_api.enums.StatusCadastro;
import br.com.projeto_sidi.api.projeto_sidi_api.model.Visitante;


public interface VisitanteRepository extends JpaRepository<Visitante, Long> {
    
    Optional<Visitante> findByCpf(String cpf);
    
    Optional<Visitante> findByEmail(String email);
    
    List<Visitante> findByStatus(StatusCadastro status);
    
     List<Visitante> findBySetor(Setor setor); 
    
    List<Visitante> findByData(String data);
    
    long countByStatus(StatusCadastro status);
}