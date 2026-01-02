

 package com.example.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Search {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
private String title;
    private String teams;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime savedAt;

    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;

   
    public Long getId() { return id; }
    public String getTitle() { return title; } 
    public String getTeams() { return teams; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
    public LocalDateTime getSavedAt() { return savedAt; }
    public Crew getCrew() { return crew; }

    
      public void setTitle(String title) { this.title = title; } 
    public void setTeams(String teams) { this.teams = teams; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }
    public void setCrew(Crew crew) { this.crew = crew; }
}

    

