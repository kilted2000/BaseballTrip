package com.example.backend.model;

import java.util.List;

public class TubeyContext {
    private String username;
    private String favTeam;
    private List<String> foodAllergies;
    private List<String> foodPreferences;
    private List<String> hobbies;
    private List<String> interests;
    private List<String> searches;

    public TubeyContext(
            String username,
            String favTeam,
            List<String> foodAllergies,
            List<String> foodPreferences,
            List<String> hobbies,
            List<String> interests,
            List<String> searches
    ) {
        this.username = username;
        this.favTeam = favTeam;
        this.foodAllergies = foodAllergies;
        this.foodPreferences = foodPreferences;
        this.hobbies = hobbies;
        this.interests = interests;
        this.searches = searches;
    }

    
    public String getUsername() { return username; }
    public String getFavTeam() { return favTeam; }
    public List<String> getFoodAllergies() { return foodAllergies; }
    public List<String> getFoodPreferences() { return foodPreferences; }
    public List<String> getHobbies() { return hobbies; }
    public List<String> getInterests() { return interests; }
    public List<String> getSearches() { return searches; }
}



