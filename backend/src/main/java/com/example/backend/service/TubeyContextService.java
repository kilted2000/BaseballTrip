package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.model.Crew;
import com.example.backend.model.TubeyContext;
import com.example.backend.repository.CrewRepository;

@Service
public class TubeyContextService {

    private final CrewRepository crewRepository;

    public TubeyContextService(CrewRepository crewRepository) {
        this.crewRepository = crewRepository;
    }

    public TubeyContext buildContext(String clerkUserId) {
        Crew crew = crewRepository.findByClerkUserId(clerkUserId)
            .orElseThrow(() -> new RuntimeException("Crew not found"));

       
        List<String> searches = crew.getSearches()
            .stream()
            .map(search -> search.getSearchTerm()) 
            .collect(Collectors.toList());

        return new TubeyContext(
            crew.getUserName(),
            crew.getFavTeam(),
            crew.getFoodAllergies(),
            crew.getFoodPreferences(),
            crew.getHobbies(),
            crew.getInterests(),
            searches
        );
    }
}





