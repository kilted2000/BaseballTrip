
package com.example.backend.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "crew")
public class Crew {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    private String email;
    private String favTeam;

public String getFavTeam() { return favTeam; }


    @Column(nullable = false, unique = true)
    private String clerkUserId;

    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Search> searches = new ArrayList<>();

    public Crew() {}

    
    public Crew(String userName, String email, String clerkUserId) {
        this.userName = userName;
        this.email = email;
        this.clerkUserId = clerkUserId;
    }

   
    public Long getId() { return id; }
    public String getUserName() { return userName; }
    public String getEmail() { return email; }
    public String getClerkUserId() { return clerkUserId; }
    public List<Search> getSearches() { return searches; }

   
    public void setUserName(String userName) { this.userName = userName; }
    public void setEmail(String email) { this.email = email; }
    public void setClerkUserId(String clerkUserId) { this.clerkUserId = clerkUserId; }

    
    public void addSearch(Search search) {
        searches.add(search);
        search.setCrew(this);
    }

public void setFavTeam(String favTeam) {
    this.favTeam = favTeam;
}

    public void setSearches(List<Search> searches) {
        this.searches = searches;
    }

}

