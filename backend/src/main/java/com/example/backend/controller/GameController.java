package com.example.backend.controller;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.GameModel;
import com.example.backend.service.GameService;


@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("/games")
public List<GameModel> getGamesFiltered(
    @RequestParam String start,
    @RequestParam String end,
    @RequestParam String teams
) {
    LocalDate startDate = LocalDate.parse(start);
    LocalDate endDate = LocalDate.parse(end);

    List<String> teamList = List.of(teams.split(","));
    return gameService.getFilteredGames(startDate, endDate, teamList);
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

// }



