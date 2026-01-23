package com.example.backend.model;

import java.util.List;

public record CrewResponseDTO(
    Long id,
    String username,
    String email,
    String favTeam,
    List<String> foodAllergies,
    List<String> foodPreferences,
    List<String> hobbies,
    List<String> interests
) {}
