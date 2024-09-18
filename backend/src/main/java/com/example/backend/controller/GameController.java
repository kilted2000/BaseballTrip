package com.example.backend.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.games.Game;
import com.example.backend.service.GameService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMa