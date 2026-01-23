package com.example.backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.model.*;
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

    // ✅ SAVE SEARCH
    @PostMapping
    public ResponseEntity<SearchResponseDTO> saveSearch(
            @RequestBody SearchRequestDTO dto
    ) {
        if (dto.getCrewId() == null || dto.getSearchTerm() == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "crewId and searchTerm are required"
            );
        }

        Crew crew = crewRepository.findById(dto.getCrewId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Crew not found"
            ));

        Search search = new Search();
        search.setSearchTerm(dto.getSearchTerm());
        search.setCrew(crew);
        search.setSavedAt(LocalDateTime.now());

        Search saved = searchService.saveSearch(search);

        return ResponseEntity.ok(
            new SearchResponseDTO(
                saved.getId(),
                saved.getSearchTerm(),
                saved.getSavedAt()
            )
        );
    }

    // ✅ GET SEARCH BY ID
    @GetMapping("/{id}")
    public ResponseEntity<SearchResponseDTO> getSearchById(@PathVariable Long id) {
        Search search = searchService.getSearchById(id);

        if (search == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Search not found");
        }

        return ResponseEntity.ok(
            new SearchResponseDTO(
                search.getId(),
                search.getSearchTerm(),
                search.getSavedAt()
            )
        );
    }

    // ✅ GET SEARCHES BY CREW
    @GetMapping("/crew/{crewId}")
    public List<SearchResponseDTO> getSearchesByCrew(@PathVariable Long crewId) {
        return searchService.getSearchesByCrewId(crewId)
            .stream()
            .map(s -> new SearchResponseDTO(
                s.getId(),
                s.getSearchTerm(),
                s.getSavedAt()
            ))
            .collect(Collectors.toList());
    }

    // ✅ DELETE SEARCH
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteSearch(@PathVariable Long id) {
        searchService.deleteSearch(id);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "id", id
        ));
    }
}






