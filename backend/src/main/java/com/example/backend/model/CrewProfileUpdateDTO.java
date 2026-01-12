package com.example.backend.model;

import java.util.List;

public class CrewProfileUpdateDTO {

    private String username;
    private String favTeam;
    private List<String> foodAllergies;
    private List<String> foodPreferences;
    private List<String> hobbies;
    private List<String> interests;

    public CrewProfileUpdateDTO() {}

    public String getUsername() { return username; }
    public String getFavTeam() { return favTeam; }
    public List<String> getFoodAllergies() { return foodAllergies; }
    public List<String> getFoodPreferences() { return foodPreferences; }
    public List<String> getHobbies() { return hobbies; }
    public List<String> getInterests() { return interests; }

    public void setUsername(String username) { this.username = username; }
    public void setFavTeam(String favTeam) { this.favTeam = favTeam; }
    public void setFoodAllergies(List<String> foodAllergies) { this.foodAllergies = foodAllergies; }
    public void setFoodPreferences(List<String> foodPreferences) { this.foodPreferences = foodPreferences; }
    public void setHobbies(List<String> hobbies) { this.hobbies = hobbies; }
    public void setInterests(List<String> interests) { this.interests = interests; }
}




