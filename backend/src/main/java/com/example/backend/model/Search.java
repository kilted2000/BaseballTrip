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

    private String teams; // comma-separated e.g. "STL,NYY,BOS,LAD"
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime savedAt;

    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;

    public void setCrew(Crew crew) {
        this.crew = crew;
    }

    // Getters and setters...

    public void setSavedAt(LocalDateTime now) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}

 
    

