package br.com.projeto_sidi.api.projeto_sidi_api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto_sidi.api.projeto_sidi_api.service.IAService;

@RestController
@RequestMapping("/ia")
public class IAController {

    @Autowired
    private IAService iaService;

    @PostMapping
    public Map<String, String> perguntar(@RequestBody Map<String, Object> corpo) {

        String mensagem = (String) corpo.get("mensagem");

        List<Map<String, String>> historico = (List<Map<String, String>>) corpo.get("historico");

        String resposta = iaService.perguntarIA(mensagem, historico);

        return Map.of("resposta", resposta);
    }
}