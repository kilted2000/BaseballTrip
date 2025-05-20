

package com.example.backend.service;
import java.time.LocalDate;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.backend.model.GameModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Service
public class GameService {

    private List<GameModel> cachedGames;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${sportsdata.api.key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;

    @PostConstruct
    public void init() throws JsonProcessingException {
        this.cachedGames = fetchGamesFromApi(); // Load once at startup
    }

    public List<GameModel> fetchGamesFromApi() throws JsonProcessingException {
    

        long startTime = System.currentTimeMillis();

        int currentSeason = Year.now().getValue();
        String url = "https://api.sportsdata.io/v3/mlb/scores/json/Games/" + currentSeason + "?key=" + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        System.out.println("Sending request to SportsData API...");

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        String jsonResponse = response.getBody();
        List<GameModel> games = new ArrayList<>();

        if (jsonResponse != null) {
            games = objectMapper.readValue(jsonResponse, new TypeReference<List<GameModel>>() {});
        }

        long endTime = System.currentTimeMillis();
        System.out.println("Total fetchGamesFromApi() time: " + (endTime - startTime) + " ms");

        return games;
    }

    public List<GameModel> getFilteredGames(LocalDate start, LocalDate end, List<String> teams) {
        System.out.println("Filtering games from " + start + " to " + end);
        System.out.println("Target teams: " + teams);
        

        List<String> lowerCaseTeams = teams.stream()
        .map(String::toLowerCase)
        .toList();
    System.out.println("Filtering against teams (lowercase): " + lowerCaseTeams);
    System.out.println("Total cached games: " + cachedGames.size());
    
        List<GameModel> filteredGames = cachedGames.stream()
            .filter(game -> {
                String dateStr = game.getDate(); // extra clarity
                LocalDate gameDate = LocalDate.parse(dateStr.substring(0, 10));
    
                boolean inRange = !gameDate.isBefore(start) && !gameDate.isAfter(end);
                boolean teamMatches = teams.contains(game.getHomeTeam());
    
                if (inRange && teamMatches) {
                    System.out.println("✅ Match: " + game.getHomeTeam() + " on " + gameDate);
                }
    
                return inRange && teamMatches;
            })
            .toList();
    
        System.out.println("Filtered game count: " + filteredGames.size()); // Optional but helpful
    
        return filteredGames; // ← This is what was missing
    }
    

        // return cachedGames.stream()
        //     .filter(game -> {
        //         LocalDate gameDate = LocalDate.parse(game.getDate().substring(0, 10));
        //         return !gameDate.isBefore(start) &&
        //                !gameDate.isAfter(end) &&
        //                teams.contains(game.getHomeTeam());
        //     })
        //     .toList();
       
    }




// @Service
// public class GameService {

//     @Autowired
//     private RestTemplate restTemplate;

//     @Value("${api.key}")
// private String apiKey;


//     public <T> List<GameModel> fetchGamesFromApi() throws JsonMappingException, JsonProcessingException {
//         long startTime = System.currentTimeMillis();


//     int currentSeason = Year.now().getValue();
//     String url = "https://api.sportsdata.io/v3/mlb/scores/json/Games/" + currentSeason + "?key=" + apiKey;

//     HttpHeaders headers = new HttpHeaders();
//     headers.set("Authorization", "Bearer " + apiKey);

//     HttpEntity<String> entity = new HttpEntity<>(headers);

//     System.out.println("Sending request to SportsData API...");

//     long apiCallStart = System.currentTimeMillis();
//     ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
//     long apiCallEnd = System.currentTimeMillis();

//     System.out.println("API call duration: " + (apiCallEnd - apiCallStart) + " ms");

//     List<GameModel> games = new ArrayList<>();
//     String jsonResponse = response.getBody();

//     if (jsonResponse != null) {
//         long parsingStart = System.currentTimeMillis();
//         ObjectMapper mapper = new ObjectMapper();
//         games = mapper.readValue(jsonResponse, new TypeReference<List<GameModel>>() {});
//         long parsingEnd = System.currentTimeMillis();

//         System.out.println("JSON parsing duration: " + (parsingEnd - parsingStart) + " ms");
//     }

//     long endTime = System.currentTimeMillis();
//     System.out.println("Total fetchGamesFromApi() time: " + (endTime - startTime) + " ms");

//     return games;
   
//     }
// }

