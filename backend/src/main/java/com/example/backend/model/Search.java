package com.example.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "search")
public class Search {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String searchTerm;

    private LocalDateTime savedAt;

    @ManyToOne
    private Crew crew;

    public Search() {}

    public Search(String searchTerm, Crew crew) {
        this.searchTerm = searchTerm;
        this.crew = crew;
    }

    public Long getId() { return id; }
    public String getSearchTerm() { return searchTerm; }
    public Crew getCrew() { return crew; }
    public LocalDateTime getSavedAt() { return savedAt; }

    public void setSearchTerm(String searchTerm) { this.searchTerm = searchTerm; }
    public void setCrew(Crew crew) { this.crew = crew; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }
}

    

