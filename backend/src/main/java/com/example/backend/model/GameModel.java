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
    private String HomeTeam;
    @JsonProperty("DateTime")
    private String DateTime;

    public GameModel() {
    }

    public GameModel(Long gameId, String HomeTeam, String DateTime) {
        this.gameId = gameId;
        this.HomeTeam = HomeTeam;
        this.DateTime = DateTime;
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
        return HomeTeam;
    }

    public void setHomeTeam(String HomeTeam) {
        this.HomeTeam = HomeTeam;
    }

    public String getDate() {
        return DateTime;
    }
    public void setDate(String DateTime) {
      