package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Search;
import com.example.backend.repository.SearchRepository;

@Service
public class SearchService {

    private final SearchRepository searchRepository;

    @Autowired
    public SearchService(SearchRepository searchRepository) {
        this.searchRepository = searchRepository;
    }

    public Search saveSearch(Search search) {
        return searchRepository.save(search);
    }

    public List<Search> getSearchesByCrewId(Long crewId) {
        return searchRepository.findByCrewId(crewId);
    }
}


