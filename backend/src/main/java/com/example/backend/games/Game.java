package com.example.backend.games;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
 public record Game(String Day, String team) { 
    public String getDayInCustomFormat() {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("EEE, d MMM", Locale.ENGLISH);
        
        LocalDate date = LocalDate.parse(Day, inputFormatter);
        return date.format(outputFormatter);
    }
 }
