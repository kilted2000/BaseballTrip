package com.example.backend.repository;

public interface UserProfileProjection {
    String getClerkUserId();

    String[] getFoodAllergies();
    String[] getFoodPreferences();
    String[] getHobbies();
    String[] getInterests();
}

