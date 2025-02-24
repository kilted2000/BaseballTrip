package com.example.backend.model;


import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class GameModel {

    @Id
    @JsonProperty("GameID") 
    private Long gameId;
     @JsonProperty("HomeTeam")
    private String HomeTeam;
    @JsonProperty("Date")
    private String date;

    public GameModel() {
    }

    public GameModel(Long gameId, String HomeTeam, String date) {
        this.gameId = gameId;
        this.HomeTeam = HomeTeam;
        this.date = date;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public String getHomeTeam() {
        return HomeTeam;
    }

    public void setHomeTeam(String HomeTeam) {
        this.HomeTeam = HomeTeam;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
}

