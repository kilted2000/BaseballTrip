package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.model.Crew;
import com.example.backend.model.TubeyContext;
import com.example.backend.repository.CrewRepository;

@Service
public class TubeyContextService {

    private final CrewRepository crewRepository;

    public TubeyContextService(CrewRepository crewRepository) {
        this.crewRepository = crewRepository;
    }

    @Transactional(readOnly = true)  // ADD THIS ANNOTATION
    public TubeyContext buildContext(String clerkUserId) {
        System.out.println("=== TubeyContextService.buildContext ===");
        System.out.println("Looking for clerkUserId: " + clerkUserId);
        
        // Find or create crew with placeholder data
        Crew crew = crewRepository.findByClerkUserId(clerkUserId)
            .orElseGet(() -> {
                System.out.println("Crew not found, creating new crew for: " + clerkUserId);
                Crew newCrew = new Crew("New User", "temp@example.com", clerkUserId);
                Crew savedCrew = crewRepository.save(newCrew);
                System.out.println("Created new crew with ID: " + savedCrew.getId());
                return savedCrew;
            });

        System.out.println("Found/Created crew: " + crew.getUsername() + " (ID: " + crew.getId() + ")");

        // Access searches within the transaction
        List<String> searches = crew.getSearches()
            .stream()
            .map(search -> search.getSearchTerm()) 
            .collect(Collectors.toList());

        System.out.println("Loaded " + searches.size() + " searches");

        return new TubeyContext(
            crew.getUsername(),
            crew.getFavTeam(),
            crew.getFoodAllergies(),
            crew.getFoodPreferences(),
            crew.getHobbies(),
            crew.getInterests(),
            searches
        );
    }
}





