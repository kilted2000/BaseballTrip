package com.example.backend.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.model.Crew;
import com.example.backend.model.CrewProfileUpdateDTO;
import com.example.backend.model.CrewResponseDTO;
import com.example.backend.repository.CrewRepository;

@Service
public class CrewService {

    private final CrewRepository crewRepository;

    public CrewService(CrewRepository crewRepository) {
        this.crewRepository = crewRepository;
    }

    /* ---------- READ ---------- */

    @Transactional(readOnly = true)
    public CrewResponseDTO getCrewByEmail(String email) {
        Crew crew = crewRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Crew not found"));

        return toCrewResponseDTO(crew);
    }
// Add this method to CrewService
public Crew getOrCreateByClerkUserId(String clerkUserId) {
    return crewRepository.findByClerkUserId(clerkUserId)
        .orElseGet(() -> {
            Crew newCrew = new Crew("New User", "user@example.com", clerkUserId);
            return crewRepository.save(newCrew);
        });
}
    /* ---------- UPDATE ---------- */

    @Transactional
    public CrewResponseDTO updateProfile(Long crewId, CrewProfileUpdateDTO dto) {
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new RuntimeException("Crew not found"));

        if (dto.getUsername() != null) {
            crew.setUsername(dto.getUsername());
        }

        if (dto.getFavTeam() != null) {
            crew.setFavTeam(dto.getFavTeam());
        }

        if (dto.getFoodPreferences() != null) {
            crew.getFoodPreferences().clear();
            crew.getFoodPreferences().addAll(dto.getFoodPreferences());
        }

        if (dto.getFoodAllergies() != null) {
            crew.getFoodAllergies().clear();
            crew.getFoodAllergies().addAll(dto.getFoodAllergies());
        }

        if (dto.getHobbies() != null) {
            crew.getHobbies().clear();
            crew.getHobbies().addAll(dto.getHobbies());
        }

        if (dto.getInterests() != null) {
            crew.getInterests().clear();
            crew.getInterests().addAll(dto.getInterests());
        }

        return toCrewResponseDTO(crew);
    }

    /* ---------- MAPPER ---------- */

    private CrewResponseDTO toCrewResponseDTO(Crew crew) {
        return new CrewResponseDTO(
                crew.getId(),
                crew.getUsername(),
                crew.getEmail(),
                crew.getFavTeam(),
                new ArrayList<>(crew.getFoodAllergies()),
                new ArrayList<>(crew.getFoodPreferences()),
                new ArrayList<>(crew.getHobbies()),
                new ArrayList<>(crew.getInterests())
        );
    }
}





    

