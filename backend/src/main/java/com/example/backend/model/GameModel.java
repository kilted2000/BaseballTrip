package com.example.backend.model;


import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true) 
public class GameModel {

     @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; 
    @JsonProperty("GameID")
    private Long gameId; 
     @JsonProperty("HomeTeam")
    private String homeTeam;
    @JsonProperty("Date")
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime date;

 

    public GameModel(Long gameId, String homeTeam, LocalDateTime date) {
        this.gameId = gameId;
        this.homeTeam = homeTeam;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public String getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(String homeTeam) {
        this.homeTeam = homeTeam;
    }

    public LocalDateTime getDate() { 
        return date; 
    }

    public void setDate(LocalDateTime date) { 
        this.date = date; 
    }

    public LocalDate getGameDateOnly() {
        return date.toLocalDate();
    }
    
}

