package com.example.backend.games;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;




@JsonIgnoreProperties(ignoreUnknown = true)
 public record Game(String Day, String HomeTeam) { 
    public String getDayInCustomFormat() {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("EEE, d MMM", Locale.ENGLISH);
        
        LocalDateTime dateTime = LocalDateTime.parse(Day, inputFormatter);
        return dateTime.format(outputFormatter);
    }
 }


// import com.fasterxml.jackson.annotation.JsonFormat;
// import java.time.LocalDate