package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Crew;

public interface CrewRepository extends JpaRepository<Crew, Long> {
    Crew findByUserName(String userName);
    Optional<Crew> findByEmail(String email);
    Optional<Crew> findByClerkUserId(String clerkUserId);


}



