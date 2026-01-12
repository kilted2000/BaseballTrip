package com.example.backend.controller;

import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.TubeyContext;
import com.example.backend.service.AIService;
import com.example.backend.service.TubeyContextService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AiController {

    private final AIService aiService;
    private final TubeyContextService tubeyContextService;

    public AiController(AIService aiService, TubeyContextService tubeyContextService) {
        this.aiService = aiService;
        this.tubeyContextService = tubeyContextService;
    }

    @PostMapping("/query")
    public ResponseEntity<String> getResponse(@RequestBody AiRequest request) {
        try {
            TubeyContext context = tubeyContextService.buildContext(request.getClerkUserId());

            StringBuilder prompt = new StringBuilder();
            prompt.append("You are Tubey, a friendly MLB roadtrip assistant.\n\n");

            prompt.append("User Profile:\n");
            prompt.append("- Name: ").append(context.getUsername()).append("\n");
            prompt.append("- Favorite Team: ").append(
                    context.getFavTeam() != null ? context.getFavTeam() : "None").append("\n");

            if (!context.getHobbies().isEmpty())
                prompt.append("- Hobbies: ").append(String.join(", ", context.getHobbies())).append("\n");

            if (!context.getInterests().isEmpty())
                prompt.append("- Interests: ").append(String.join(", ", context.getInterests())).append("\n");

            if (!context.getFoodPreferences().isEmpty())
                prompt.append("- Food Preferences: ").append(String.join(", ", context.getFoodPreferences())).append("\n");

            if (!context.getFoodAllergies().isEmpty())
                prompt.append("- Allergies: ").append(String.join(", ", context.getFoodAllergies())).append("\n");

            
            if (context.getSearches() != null && !context.getSearches().isEmpty()) {
                prompt.append("Saved Searches:\n");
                prompt.append(context.getSearches().stream()
                        .map(term -> "- " + term)
                        .collect(Collectors.joining("\n")));
                prompt.append("\n");
            }

            prompt.append("\nUser Question:\n").append(request.getUserQuestion()).append("\n\n");

            prompt.append("Instructions:\n")
                  .append("- Be helpful, friendly, and concise.\n")
                  .append("- Use profile and searches to personalize answers.\n")
                  .append("- If no info, answer generally.\n");

            String aiReply = aiService.getAIResponse(prompt.toString()).block(); // Mono -> String

            return ResponseEntity.ok(aiReply);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

   
    public static class AiRequest {
        private String clerkUserId;
        private String userQuestion;

        public String getClerkUserId() { return clerkUserId; }
        public void setClerkUserId(String clerkUserId) { this.clerkUserId = clerkUserId; }

        public String getUserQuestion() { return userQuestion; }
        public void setUserQuestion(String userQuestion) { this.userQuestion = userQuestion; }
    }
}



