package com.example.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Crew;
import com.example.backend.model.CrewProfileUpdateDTO;
import com.example.backend.model.CrewResponseDTO;
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

    /* ---------- READ ---------- */

    @GetMapping("/by-email/{email}")
    public CrewResponseDTO getCrewByEmail(@PathVariable String email) {
        return crewService.getCrewByEmail(email);
    }

    @GetMapping("/clerk/{clerkUserId}")
    public ResponseEntity<CrewResponseDTO> getOrCreateByClerkId(@PathVariable String clerkUserId) {
        System.out.println("=== GET OR CREATE CREW ===");
        System.out.println("ClerkUserId: " + clerkUserId);
        
        Crew crew = crewRepository.findByClerkUserId(clerkUserId)
            .orElseGet(() -> {
                System.out.println("Creating new crew for clerkUserId: " + clerkUserId);
                // Use placeholder data - will be updated later from frontend
                Crew newCrew = new Crew("New User", "temp@example.com", clerkUserId);
                Crew saved = crewRepository.save(newCrew);
                System.out.println("Created crew with ID: " + saved.getId());
                return saved;
            });
        
        System.out.println("Returning crew ID: " + crew.getId());
        
        return ResponseEntity.ok(new CrewResponseDTO(
            crew.getId(),
            crew.getUsername(),
            crew.getEmail(),
            crew.getFavTeam(),
            crew.getFoodAllergies(),
            crew.getFoodPreferences(),
            crew.getHobbies(),
            crew.getInterests()
        ));
    }

    /* ---------- CREATE/UPDATE ---------- */

    @PostMapping("/clerk")
    public ResponseEntity<CrewResponseDTO> createOrUpdateFromClerk(@RequestBody ClerkUserRequest request) {
        System.out.println("=== CREATE/UPDATE CREW FROM CLERK ===");
        System.out.println("ClerkUserId: " + request.getClerkUserId());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Username: " + request.getUsername());
        
        Crew crew = crewRepository.findByClerkUserId(request.getClerkUserId())
            .orElseGet(() -> new Crew(
                request.getUsername() != null ? request.getUsername() : "New User",
                request.getEmail() != null ? request.getEmail() : "user@example.com",
                request.getClerkUserId()
            ));
        
        // Update email and username if they've changed
        if (request.getEmail() != null) {
            crew.setEmail(request.getEmail());
        }
        if (request.getUsername() != null) {
            crew.setUsername(request.getUsername());
        }
        
        Crew saved = crewRepository.save(crew);
        
        return ResponseEntity.ok(new CrewResponseDTO(
            saved.getId(),
            saved.getUsername(),
            saved.getEmail(),
            saved.getFavTeam(),
            saved.getFoodAllergies(),
            saved.getFoodPreferences(),
            saved.getHobbies(),
            saved.getInterests()
        ));
    }

    @PatchMapping("/{crewId}/profile")
    public CrewResponseDTO updateCrewProfile(
            @PathVariable Long crewId,
            @RequestBody CrewProfileUpdateDTO dto
    ) {
        return crewService.updateProfile(crewId, dto);
    }

    /* ---------- DEBUG ---------- */
    
    @GetMapping("/debug/{clerkUserId}")
    public ResponseEntity<?> debugCrew(@PathVariable String clerkUserId) {
        try {
            System.out.println("=== DEBUG: Looking for clerkUserId: " + clerkUserId);
            
            // Try to find the crew
            Optional<Crew> crew = crewRepository.findByClerkUserId(clerkUserId);
            
            if (crew.isPresent()) {
                System.out.println("FOUND crew: " + crew.get().getUsername());
                return ResponseEntity.ok(Map.of(
                    "found", true,
                    "id", crew.get().getId(),
                    "username", crew.get().getUsername(),
                    "email", crew.get().getEmail(),
                    "clerkUserId", crew.get().getClerkUserId()
                ));
            } else {
                System.out.println("NOT FOUND - crew does not exist");
                
                // List all crews to see what's in the database
                List<Crew> allCrews = crewRepository.findAll();
                System.out.println("Total crews in database: " + allCrews.size());
                allCrews.forEach(c -> 
                    System.out.println("  - Crew ID: " + c.getId() + ", ClerkUserId: " + c.getClerkUserId())
                );
                
                return ResponseEntity.status(404).body(Map.of(
                    "found", false,
                    "message", "Crew not found with clerkUserId: " + clerkUserId,
                    "totalCrews", allCrews.size(),
                    "hint", "Check backend console for list of all clerkUserIds in database"
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    /* ---------- INNER CLASS ---------- */

    public static class ClerkUserRequest {
        private String clerkUserId;
        private String email;
        private String username;
        
        public String getClerkUserId() { return clerkUserId; }
        public void setClerkUserId(String clerkUserId) { this.clerkUserId = clerkUserId; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
    }
}





