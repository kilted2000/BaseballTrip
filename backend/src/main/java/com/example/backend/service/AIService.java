package com.example.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class AIService {

    private final WebClient webClient;
    private final String apiKey;
    private final String model;

    public AIService(
            @Value("${openai.api.key}") String apiKey,
            @Value("${openai.api.url:https://api.openai.com}") String apiUrl,
            @Value("${openai.api.model:gpt-4o-mini}") String model) {
        this.apiKey = apiKey;
        this.model = model;
        this.webClient = WebClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public Mono<String> getAIResponse(String userPrompt) {
        var requestBody = Map.of(
            "model", model,
            "messages", List.of(
                Map.of(
                    "role", "system",
                    "content", "You are a helpful baseball trip planning assistant."
                ),
                Map.of(
                    "role", "user", 
                    "content", userPrompt
                )
            ),
            "temperature", 0.7
        );

        return webClient.post()
                .uri("/v1/chat/completions")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    var choices = (List<Map<String, Object>>) response.get("choices");
                    var firstChoice = choices.get(0);
                    var message = (Map<String, String>) firstChoice.get("message");
                    return message.get("content");
                });
    }
}