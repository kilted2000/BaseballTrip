package com.example.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Crew;
import com.example.backend.model.Search;
import com.example.backend.repository.CrewRepository;
import com.example.backend.service.SearchService;

@RestController
@RequestMapping("/api/searches")
public class SearchController {

    private final SearchService searchService;
    private final CrewRepository crewRepository;

    @Autowired
    public SearchController(SearchService searchService, CrewRepository crewRepository) {
        this.searchService = searchService;
        this.crewRepository = crewRepository;
    }

    @PostMapping("/{crewId}")
    public Search saveSearch(@PathVariable Long crewId, @RequestBody Search search) {
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new RuntimeException("Crew not found"));
        search.setCrew(crew);
        search.setSavedAt(LocalDateTime.now());
        return searchService.saveSearch(search);
    }

    @GetMapping("/by-crew/{crewId}")
    public List<Search> getSearchesByCrew(@PathVariable Long crewId) {
        return searchService.getSearchesByCrewId(crewId);
    }

    @GetMapping("/{searchId}")
public Search getSearchById(@PathVariable Long searchId) {
    return searchService.getSearchById(searchId);
}

}

