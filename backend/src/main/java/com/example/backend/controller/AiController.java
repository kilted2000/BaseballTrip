
package com.example.backend.controller;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.AIService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AIService aiService;

    public AiController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/query")
    public Mono<String> getResponse(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");
        return aiService.getAIResponse(prompt);
    }
}

