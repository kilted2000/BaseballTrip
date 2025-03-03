package com.example.backend.controller;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.GameModel;
import com.example.backend.service.GameService;

@RestController
@RequestMapping("/api")
public class GameController {
    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/games")
    public List<GameModel> getGames(
            @RequestParam(required = false) List<String> teams,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<GameModel> allGames = gameService.fetchGamesFromApi();

        return allGames.stream()
                .filter(game -> {
                    boolean isTeamMatch = (teams == null || teams.isEmpty()) || teams.contains(game.getHomeTeam());

                    LocalDate gameDate = game.getDate().toLocalDate(); // Convert LocalDateTime to LocalDate
                    
                    boolean isDateMatch = (startDate == null || endDate == null) ||
                            (!gameDate.isBefore(startDate) && !gameDate.isAfter(endDate)); 

                    return isTeamMatch && isDateMatch;
                })
                .collect(Collectors.toList());
    }
}
