package com.example.backend.model;

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
    
    
    @JsonProperty("DateTime")
    private String dateTime;

    public GameModel() {
    }

    public GameModel(Long gameId, String homeTeam, String awayTeam, String dateTime) {
        this.gameId = gameId;
        this.homeTeam = homeTeam;
        this.dateTime = dateTime;
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

    public String getDate() {
        return dateTime;
    }

    public void setDate(String dateTime) {
        this.dateTime = dateTime;
    }
}

