package com.example.backend.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.model.Crew;
import com.example.backend.model.Search;
import com.example.backend.repository.CrewRepository;
import com.example.backend.service.SearchService;

@RestController
@RequestMapping("/api/searches")
@CrossOrigin
public class SearchController {

    private final SearchService searchService;
    private final CrewRepository crewRepository;

    public SearchController(SearchService searchService, CrewRepository crewRepository) {
        this.searchService = searchService;
        this.crewRepository = crewRepository;
    }

    @PostMapping
    public Search saveSearch(@RequestBody Search search) {
        if (search.getCrew() == null || search.getCrew().getId() == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Crew must be set"
            );
        }

        Crew crew = crewRepository.findById(search.getCrew().getId())
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Crew not found"
                ));

        search.setCrew(crew);
        search.setSavedAt(LocalDateTime.now());
        return searchService.saveSearch(search);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Search> getSearchById(@PathVariable Long id) {
        Search search = searchService.getSearchById(id);
        
        if (search == null) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Search not found with id: " + id
            );
        }
        
        return ResponseEntity.ok(search);
    }

    
    @GetMapping("/crew/{crewId}")
    public List<Search> getSearchesByCrew(@PathVariable Long crewId) {
        return searchService.getSearchesByCrewId(crewId);
    }

    
    @GetMapping("/by-crew/{crewId}")
    public List<Search> getSearchesByCrewLegacy(@PathVariable Long crewId) {
        return searchService.getSearchesByCrewId(crewId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteSearch(@PathVariable Long id) {
        try {
            searchService.deleteSearch(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Search deleted successfully");
            response.put("id", id);
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                e.getMessage()
            );
        }
    }
}