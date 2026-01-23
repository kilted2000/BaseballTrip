package com.example.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "search")
public class Search {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @Column(name = "search_term")
    private String searchTerm;

    @Column(name = "saved_at")
    private LocalDateTime savedAt;

    public Search() {}

    public Search(String searchTerm, Crew crew) {
        this.searchTerm = searchTerm;
        this.crew = crew;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Crew getCrew() { return crew; }
    public void setCrew(Crew crew) { this.crew = crew; }

    public String getSearchTerm() { return searchTerm; }
    public void setSearchTerm(String searchTerm) { this.searchTerm = searchTerm; }

    public LocalDateTime getSavedAt() { return savedAt; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }
}








    

