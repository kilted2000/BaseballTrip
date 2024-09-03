package com.example.backend.games;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
 public record Game(String DateTime, String HomeTeam) { }
