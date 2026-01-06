package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    @Query("SELECT u.clerkUserId AS clerkUserId FROM UserProfile u WHERE u.clerkUserId = :clerkUserId")
    UserProfileProjection findProfileByClerkUserId(@Param("clerkUserId") String clerkUserId);
}



