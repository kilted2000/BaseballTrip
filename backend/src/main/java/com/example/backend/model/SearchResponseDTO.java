package com.example.backend.model;

import java.time.LocalDateTime;

public class SearchResponseDTO {

    private Long id;
    private String searchTerm;
    private LocalDateTime savedAt;

    public SearchResponseDTO(Long id, String searchTerm, LocalDateTime savedAt) {
        this.id = id;
        this.searchTerm = searchTerm;
        this.savedAt = savedAt;
    }

    public Long getId() { return id; }
    public String getSearchTerm() { return searchTerm; }
    public LocalDateTime getSavedAt() { return savedAt; }
}





