package com.example.backend.controller;

import com.example.backend.model.Crew;
import com.example.backend.service.CrewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crews")
public class CrewController {

    private final CrewService crewService;

    @Autowired
    public CrewController(CrewService crewService) {
        this.crewService = crewService;
    }

    @GetMapping
    public List<Crew> getAllCrew() {
        return crewService.getAllCrew();
    }

    @PostMapping
    public Crew createCrew(@RequestBody Crew crew) {
        return crewService.saveCrew(crew);
    }
}

