package com.example.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.model.Crew;
import com.example.backend.model.CrewProfileUpdateDTO;
import com.example.backend.repository.CrewRepository;

@Service
public class CrewService {

    private final CrewRepository crewRepository;

    public CrewService(CrewRepository crewRepository) {
        this.crewRepository = crewRepository;
    }

    public Crew saveCrew(Crew crew) {
        return crewRepository.save(crew);
    }

    @Transactional(readOnly = true)
    public Optional<Crew> getCrewByEmail(String email) {
        return crewRepository.findByEmail(email);
    }
    @Transactional
public Crew updateProfile(Long crewId, CrewProfileUpdateDTO dto) {
    Crew crew = crewRepository.findById(crewId)
            .orElseThrow(() -> new RuntimeException("Crew not found"));

    if (dto.getUsername() != null) {
        crew.setUsername(dto.getUsername());
    }

    if (dto.getFavTeam() != null) {
        crew.setFavTeam(dto.getFavTeam());
    }

    if (dto.getFoodAllergies() != null) {
        crew.setFoodAllergies(dto.getFoodAllergies());
    }

    if (dto.getFoodPreferences() != null) {
        crew.setFoodPreferences(dto.getFoodPreferences());
    }

    if (dto.getHobbies() != null) {
        crew.setHobbies(dto.getHobbies());
    }

    if (dto.getInterests() != null) {
        crew.setInterests(dto.getInterests());
    }

    return crewRepository.save(crew);
}

}




    

