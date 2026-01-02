package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Search;

public interface SearchRepository extends JpaRepository<Search, Long> {
    List<Search> findByCrewId(Long crewId);
  

}
