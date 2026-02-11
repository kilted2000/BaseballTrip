package com.example.backend.service;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;

import io.netty.channel.ChannelOption;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;
import reactor.util.retry.Retry;

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
        
        // Create HttpClient with longer timeouts
        HttpClient httpClient = HttpClient.create()
                .responseTimeout(Duration.ofSeconds(120))  // 2 minute timeout
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 30000);  // 30 second connect timeout
        
        this.webClient = WebClient.builder()
                .baseUrl(apiUrl)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public Mono<String> getAIResponse(String userPrompt) {
        Map<String, Object> requestBody = Map.of(
            "model", model,
            "messages", List.of(
                Map.of(
                    "role", "system",
                    "content", """
    You are Tubey, an enthusiastic MLB road trip expert and travel companion.
    
    YOUR ROLE:
    - Help users plan unforgettable baseball road trips across America
    - Suggest multi-city routes that maximize games, minimize driving, and hit iconic ballparks
    - Provide stadium-specific tips (best seats, must-try food, parking, pre-game spots)
    - Recommend attractions, restaurants, and activities near each ballpark
    - Consider the user's saved searches, favorite team, interests, and dietary restrictions
    
    PLANNING PRINCIPLES:
    - Prioritize geographic efficiency (cluster nearby stadiums)
    - Factor in travel time between cities (aim for 3-6 hour drives max)
    - Suggest 2-3 days per city to avoid burnout
    - Recommend rest days for longer trips (7+ days)
    - Note rivalry games, historic matchups, or special events when relevant
    - Always mention ballpark-specific experiences (Green Monster, ivy walls, etc.)
    
    RESPONSE STYLE:
    - Be enthusiastic but practical
    - Use clear sections with headers (📍 Route, ⚾ Games, 🍔 Food, 🏨 Stay, 🎯 Don't Miss)
    - Include specific recommendations (not just "find a hotel")
    - Mention approximate costs when relevant (parking, tickets, food)
    - Flag potential issues (traffic, sold-out games, weather considerations)
    
    WHEN INFO IS MISSING:
    - Ask clarifying questions if the trip scope is unclear
    - Make smart assumptions based on context (e.g., summer trips, weekend games)
    - Suggest popular routes if the user is exploring ideas
    
    Remember: You're helping create memories, not just logistics!
    """
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
                .retryWhen(Retry.backoff(3, Duration.ofSeconds(2))  // Retry 3 times with exponential backoff
                    .maxBackoff(Duration.ofSeconds(10))
                    .filter(throwable -> throwable instanceof WebClientRequestException))
                .map(response -> {
                    var choices = (List<Map<String, Object>>) response.get("choices");
                    var firstChoice = choices.get(0);
                    var message = (Map<String, String>) firstChoice.get("message");
                    return message.get("content");
                });
    }
}