package com.example.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    @Transactional
    public ResponseEntity<CrewResponseDTO> createOrUpdateFromClerk(@RequestBody ClerkUserRequest request) {
        System.out.println("=== CREATE/UPDATE CREW FROM CLERK ===");
        System.out.println("ClerkUserId: " + request.getClerkUserId());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Username: " + request.getUsername());
        
        try {
            Crew crew = crewRepository.findByClerkUserId(request.getClerkUserId())
                .orElseGet(() -> new Crew(
                    request.getUsername() != null ? request.getUsername() : "New User",
                    request.getEmail() != null ? request.getEmail() : "user@example.com",
                    request.getClerkUserId()
                ));
            
            // Update email and username if they've changed
            if (request.getEmail() != null && !request.getEmail().equals(crew.getEmail())) {
                crew.setEmail(request.getEmail());
            }
            if (request.getUsername() != null && !request.getUsername().equals(crew.getUsername())) {
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
        } catch (Exception e) {
            System.err.println("Error creating/updating crew: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PatchMapping("/{crewId}/profile")
    public CrewResponseDTO updateCrewProfile(
            @PathVariable Long crewId,
            @RequestBody CrewProfileUpdateDTO dto
    ) {
        return crewService.updateProfile(crewId, dto);
    }

    /* ---------- DEBUG ---------- */
    @GetMapping("/debug/all")
public ResponseEntity<?> debugAllCrews() {
    try {
        List<Crew> allCrews = crewRepository.findAll();
        
        System.out.println("=== ALL CREWS IN DATABASE ===");
        System.out.println("Total: " + allCrews.size());
        
        List<Map<String, Object>> crewInfo = allCrews.stream()
            .map(c -> {
                Map<String, Object> info = new java.util.HashMap<>();
                info.put("id", c.getId());
                info.put("clerkUserId", c.getClerkUserId() != null ? c.getClerkUserId() : "NULL");
                info.put("email", c.getEmail() != null ? c.getEmail() : "NULL");
                info.put("username", c.getUsername() != null ? c.getUsername() : "NULL");
                return info;
            })
            .collect(Collectors.toList());
        
        allCrews.forEach(c -> 
            System.out.println("ID: " + c.getId() + 
                             ", ClerkUserId: " + c.getClerkUserId() + 
                             ", Email: " + c.getEmail())
        );
        
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("total", allCrews.size());
        response.put("crews", crewInfo);
        
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        e.printStackTrace();
        Map<String, Object> error = new java.util.HashMap<>();
        error.put("error", e.getMessage());
        return ResponseEntity.status(500).body(error);
    }
}

@DeleteMapping("/debug/cleanup-duplicates")
@Transactional
public ResponseEntity<?> cleanupDuplicates() {
    try {
        List<Crew> allCrews = crewRepository.findAll();
        Map<String, List<Crew>> byClerkUserId = allCrews.stream()
            .filter(c -> c.getClerkUserId() != null)
            .collect(Collectors.groupingBy(Crew::getClerkUserId));
        
        int deletedCount = 0;
        for (Map.Entry<String, List<Crew>> entry : byClerkUserId.entrySet()) {
            if (entry.getValue().size() > 1) {
                // Keep the first one, delete the rest
                List<Crew> duplicates = entry.getValue();
                for (int i = 1; i < duplicates.size(); i++) {
                    System.out.println("Deleting duplicate crew ID: " + duplicates.get(i).getId());
                    crewRepository.delete(duplicates.get(i));
                    deletedCount++;
                }
            }
        }
        
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "Cleanup complete");
        response.put("deletedCount", deletedCount);
        
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        e.printStackTrace();
        Map<String, Object> error = new java.util.HashMap<>();
        error.put("error", e.getMessage());
        return ResponseEntity.status(500).body(error);
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




