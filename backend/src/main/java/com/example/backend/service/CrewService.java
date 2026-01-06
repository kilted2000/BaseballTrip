package com.example.backend.service;

import org.springframework.stereotype.Service;
import com.example.backend.model.Crew;
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

    public Crew getCrewByEmail(String email) {
        return crewRepository.findByEmail(email).orElse(null);
    }
}



    

