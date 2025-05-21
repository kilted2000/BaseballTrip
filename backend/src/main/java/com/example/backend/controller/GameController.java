package com.example.backend.controller;
import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.GameModel;
import com.example.backend.service.GameService;

@RestController
@RequestMapping("/api/v1")
public class GameController {
    private static final Logger logger = LoggerFactory.getLogger(GameController.class);

    @Autowired
    private GameService gameService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("API is working!");
    }

    @GetMapping("/games")
    public ResponseEntity<?> getGamesFiltered(
        @RequestParam String start,
        @RequestParam String end,
        @RequestParam String teams
    ) {
        try {
            logger.info("Received request for games with start={}, end={}, teams={}", start, end, teams);
            
            LocalDate startDate = LocalDate.parse(start);
            LocalDate endDate = LocalDate.parse(end);
            List<String> teamList = List.of(teams.split(","));
            
            List<GameModel> games = gameService.getFilteredGames(startDate, endDate, teamList);
            logger.info("Found {} games matching criteria", games.size());
            
            return ResponseEntity.ok(games);
        } catch (Exception e) {
            logger.error("Error processing games request", e);
            return ResponseEntity.badRequest().body("Error processing request: " + e.getMessage());
        }
    }

//     @GetMapping("/games")
//     public List<GameModel> getGames() throws JsonMappingException, JsonProcessingException {
//         long start = System.currentTimeMillis();

//         List<GameModel> games = gameService.fetchGamesFromApi();
    
//         long end = System.currentTimeMillis();
//         System.out.println("Total time to handle /games request: " + (end - start) + " ms");
    
//         return games;
//         //return gameService.fetchGamesFromApi();
//     }

 }



