package com.example.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Crew> getCrewByEmail(@PathVariable String email) {
        Crew crew = crewService.getCrewByEmail(email);
        if (crew == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(crew);
    }

    @PostMapping
    public Crew createCrew(@RequestBody Crew crew) {
        return crewService.saveCrew(crew);
    }

    @PatchMapping("/{crewId}")
    public Crew updateCrew(@PathVariable Long crewId,
                           @RequestBody Map<String, String> updates) {

        if (crewId == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Crew ID must not be null"
            );
        }

        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Crew not found with id " + crewId
                    )
                );

       
        String favTeam = updates.get("favTeam");
        if (favTeam != null) {
            crew.setFavTeam(favTeam);
        }

       
        String username = updates.get("username");
        if (username != null) {
            crew.setUserName(username);
        }

        return crewService.saveCrew(crew);
    }
}