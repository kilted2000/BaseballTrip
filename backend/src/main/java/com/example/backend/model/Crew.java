package com.example.backend.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "crew")
public class Crew {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String favTeam;

    @ElementCollection
    @JsonIgnore // prevent lazy init error
    private List<String> foodAllergies = new ArrayList<>();

    @ElementCollection
    @JsonIgnore // prevent lazy init error
    private List<String> foodPreferences = new ArrayList<>();

    @ElementCollection
    @JsonIgnore 
    private List<String> hobbies = new ArrayList<>();

    @ElementCollection
    @JsonIgnore 
    private List<String> interests = new ArrayList<>();

    @Column(nullable = false, unique = true)
    private String clerkUserId;

    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // prevent lazy init error
    private List<Search> searches = new ArrayList<>();

    public Crew() {}

    public Crew(String username, String email, String clerkUserId) {
        this.username = username;
        this.email = email;
        this.clerkUserId = clerkUserId;
    }

    // --- Getters ---
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getFavTeam() { return favTeam; }
    public String getClerkUserId() { return clerkUserId; }
    public List<String> getFoodAllergies() { return foodAllergies; }
    public List<String> getFoodPreferences() { return foodPreferences; }
    public List<String> getHobbies() { return hobbies; }
    public List<String> getInterests() { return interests; }
    public List<Search> getSearches() { return searches; }

    // --- Setters ---
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setFavTeam(String favTeam) { this.favTeam = favTeam; }
    public void setClerkUserId(String clerkUserId) { this.clerkUserId = clerkUserId; }
    public void setFoodAllergies(List<String> foodAllergies) { this.foodAllergies = foodAllergies; }
    public void setFoodPreferences(List<String> foodPreferences) { this.foodPreferences = foodPreferences; }
    public void setHobbies(List<String> hobbies) { this.hobbies = hobbies; }
    public void setInterests(List<String> interests) { this.interests = interests; }

    public void addSearch(Search search) {
        searches.add(search);
        search.setCrew(this);
    }
}




