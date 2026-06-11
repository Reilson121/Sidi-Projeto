package br.com.projeto_sidi.api.projeto_sidi_api.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto_sidi.api.projeto_sidi_api.service.IAService;

@RestController
@RequestMapping("/ia")
@CrossOrigin(origins = "http://localhost:5173")
public class IAController {

    private final IAService iaService;

    public IAController(IAService iaService) {
        this.iaService = iaService;
    }

    @PostMapping
    public Map<String, String> perguntar(
            @RequestBody Map<String, String> body
    ) {

        String mensagem = body.get("mensagem");

        String resposta = iaService.perguntarIA(mensagem);

        return Map.of(
                "resposta",
                resposta
        );
    }
}