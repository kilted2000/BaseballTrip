package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users") 
public class UserProfile {

    @Id
    private Long id; 

    
    private String clerkUserId;

    
}

