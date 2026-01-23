// package com.example.backend.model;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;

// @Entity
// @Table(name = "users") 
// public class UserProfile {

//     @Id
//     private Long id; 

    
//     private String clerkUserId;

    
// }
package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users") 
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    private String clerkUserId;

    // Constructors
    public UserProfile() {}

    public UserProfile(String clerkUserId) {
        this.clerkUserId = clerkUserId;
    }

    // Getters and Setters
    public Long getId() { 
        return id; 
    }
    
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getClerkUserId() { 
        return clerkUserId; 
    }
    
    public void setClerkUserId(String clerkUserId) { 
        this.clerkUserId = clerkUserId; 
    }
}
