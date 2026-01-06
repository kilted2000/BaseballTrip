package com.example.backend.model;

import java.util.List;

public class TubeyContext {
    private String userName;
    private String favTeam;
    private List<String> foodAllergies;
    private List<String> foodPreferences;
    private List<String> hobbies;
    private List<String> interests;
    private List<String> searches;

    public TubeyContext(
            String userName,
            String favTeam,
            List<String> foodAllergies,
            List<String> foodPreferences,
            List<String> hobbies,
            List<String> interests,
            List<String> searches
    ) {
        this.userName = userName;
        this.favTeam = favTeam;
        this.foodAllergies = foodAllergies;
        this.foodPreferences = foodPreferences;
        this.hobbies = hobbies;
        this.interests = interests;
        this.searches = searches;
    }

    
    public String getUserName() { return userName; }
    public String getFavTeam() { return favTeam; }
    public List<String> getFoodAllergies() { return foodAllergies; }
    public List<String> getFoodPreferences() { return foodPreferences; }
    public List<String> getHobbies() { return hobbies; }
    public List<String> getInterests() { return interests; }
    public List<String> getSearches() { return searches; }
}



