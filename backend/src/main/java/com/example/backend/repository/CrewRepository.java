package com.example.backend.repository;

import com.example.backend.model.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew, Long> {
    Crew findByUserName(String userName);
}



