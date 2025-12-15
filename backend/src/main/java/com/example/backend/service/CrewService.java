package com.example.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Crew;
import com.example.backend.repository.CrewRepository;

@Service
public class CrewService {

    private final CrewRepository crewRepository;

    @Autowired
    public CrewService(CrewRepository crewRepository) {
        this.crewRepository = crewRepository;
    }

    public List<Crew> getAllCrew() {
        return crewRepository.findAll();
    }

    public Crew getCrewByEmail(String email) {
        return crewRepository.findByEmail(email).orElse(null);
    }

    public Crew saveCrew(Crew crew) {
        return crewRepository.save(crew);
    }
}

    

