package com.example.backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;



@Entity
@Table(name = "crew")
public class Crew{

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  
  private String userName;
  private String email;

   @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Search> searches = new ArrayList<>();

  public Crew() {
  }
  
  public Crew(String userName, String email) {
    this.userName = userName;
    this.email = email;
  }
  
  public Long getId() {
    return id;
  }
  
  public String getUserName() {
    return userName;
  }

  public String getEmail() {
    return email;
}

public List<Search> getSearches() {
    return searches;
}

public void addSearch(Search search) {
    searches.add(search);
    search.setCrew(this);
}

}