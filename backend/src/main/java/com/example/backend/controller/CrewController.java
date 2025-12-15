package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Crew;
import com.example.backend.service.CrewService;

@RestController
@RequestMapping("/api/crews")
public class CrewController {

    private final CrewService crewService;

    public CrewController(CrewService crewService) {
        this.crewService = crewService;
    }

    @GetMapping
    public List<Crew> getAllCrew() {
        return crewService.getAllCrew();
    }

    @GetMapping("/by-email/{email}")
public Crew getCrewByEmail(@PathVariable String email) {
    return crewService.getCrewByEmail(email);
}


@PostMapping
public Crew createCrew(@RequestBody Crew crew) {
    if (crew.getEmail() == null || crew.getClerkUserId() == null) {
        throw new IllegalArgumentException("Email and ClerkUserId are required");
    }
    System.out.println("Creating crew: " + crew.getEmail() + ", Clerk ID: " + crew.getClerkUserId());
    return crewService.saveCrew(crew);
}


}