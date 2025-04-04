package com.example.backend.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.GameModel;
import com.example.backend.service.GameService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;


@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("/games")
    public List<GameModel> getGames() throws JsonMappingException, JsonProcessingException {
        return gameService.fetchGamesFromApi();
    }

}



