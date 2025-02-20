package com.example.backend.model;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class GameModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
     @JsonProperty("HomeTeam")
    private String HomeTeam;
    @JsonProperty("Date")
    private String date;

    public GameModel() {
    }

    public GameModel(String HomeTeam, String date) {
        this.HomeTeam = HomeTeam;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

