package com.example.backend.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.model.Crew;
import com.example.backend.model.CrewProfileUpdateDTO;
import com.example.backend.repository.CrewRepository;
import com.example.backend.service.CrewService;

@RestController
@RequestMapping("/api/crews")
@CrossOrigin
public class CrewController {

    private final CrewService crewService;
    private final CrewRepository crewRepository;

    public CrewController(CrewService crewService, CrewRepository crewRepository) {
        this.crewService = crewService;
        this.crewRepository = crewRepository;
    }

    @GetMapping("/by-email/{email}")
    public Crew getCrewByEmail(@PathVariable String email) {
        return crewRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Crew not found"));
    }

   
    @PostMapping
    public Crew createCrew(@RequestBody Crew newCrew) {
        
        Optional<Crew> existing = crewRepository.findByEmail(newCrew.getEmail());
        if (existing.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Crew already exists");
        }

        
        return crewRepository.save(newCrew);
    }

    @PatchMapping("/{crewId}/profile")
    public Crew updateProfile(
            @PathVariable Long crewId,
            @RequestBody CrewProfileUpdateDTO updates
    ) {
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Crew not found"));

        if (updates.getFavTeam() != null) crew.setFavTeam(updates.getFavTeam());
        if (updates.getUsername() != null) crew.setUserName(updates.getUsername());
        if (updates.getFoodAllergies() != null) crew.setFoodAllergies(updates.getFoodAllergies());
        if (updates.getFoodPreferences() != null) crew.setFoodPreferences(updates.getFoodPreferences());
        if (updates.getHobbies() != null) crew.setHobbies(updates.getHobbies());
        if (updates.getInterests() != null) crew.setInterests(updates.getInterests());

        return crewService.saveCrew(crew);
    }
}




