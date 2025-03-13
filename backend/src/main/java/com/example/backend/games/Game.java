package com.example.backend.games;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
 public record Game(String DateTime, String HomeTeam) { 
    public String getDayInCustomFormat() {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("EEE, d MMM", Locale.ENGLISH);
        
        LocalDate date = LocalDate.parse(DateTime, inputFormatter);
        return date.format(outputFormatter);