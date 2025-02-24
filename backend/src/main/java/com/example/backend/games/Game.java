package com.example.backend.games;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
//  public record Game(String Day, String HomeTeam) { 
//     public String getDayInCustomFormat() {
//         DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
//         DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("EEE, d MMM", Locale.ENGLISH);
        
//         LocalDateTime dateTime = LocalDateTime.parse(Day, inputFormatter);
//         return dateTime.format(outputFormatter);
//     }
//  }
public record Game(String Day, String HomeTeam) {
    public String getDay() { 
        return Day; // Keep original ISO format (e.g., "2024-03-15T18:30:00") 
    }
}
