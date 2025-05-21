package com.example.backend.service;
import java.time.LocalDate;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(GameService.class);
    private List<GameModel> cachedGames = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${sportsdata.api.key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;

    @PostConstruct
    public void init() {
        try {
            logger.info("Initializing GameService...");
            this.cachedGames = fetchGamesFromApi();
            logger.info("Successfully loaded {} games from API", cachedGames.size());
        } catch (Exception e) {
            logger.error("Failed to initialize GameService", e);
            // Initialize with empty list instead of null
            this.cachedGames = new ArrayList<>();
        }
    }

    public List<GameModel> fetchGamesFromApi() throws JsonProcessingException {
        logger.info("Fetching games from SportsData API...");
        long startTime = System.currentTimeMillis();

        int currentSeason = Year.now().getValue();
        String url = "https://api.sportsdata.io/v3/mlb/scores/json/Games/" + currentSeason + "?key=" + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        logger.info("Sending request to SportsData API: {}", url);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        String jsonResponse = response.getBody();
        List<GameModel> games = new ArrayList<>();

        if (jsonResponse != null) {
            games = objectMapper.readValue(jsonResponse, new TypeReference<List<GameModel>>() {});
            logger.info("Successfully parsed {} games from API response", games.size());
        } else {
            logger.warn("Received null response from SportsData API");
        }

        long endTime = System.currentTimeMillis();
        logger.info("Total fetchGamesFromApi() time: {} ms", (endTime - startTime));

        return games;
    }

    public List<GameModel> getFilteredGames(LocalDate start, LocalDate end, List<String> teams) {
        logger.info("Filtering games from {} to {}", start, end);
        logger.info("Target teams: {}", teams);
        
        if (cachedGames == null || cachedGames.isEmpty()) {
            logger.warn("No games available in cache");
            return new ArrayList<>();
        }
        
        // Convert teams to uppercase for case-insensitive comparison
        List<String> upperCaseTeams = teams.stream()
            .map(String::toUpperCase)
            .toList();
            
        logger.info("Filtering against teams (uppercase): {}", upperCaseTeams);
        logger.info("Total cached games: {}", cachedGames.size());
        
        List<GameModel> filteredGames = cachedGames.stream()
            .filter(game -> {
                try {
                    String dateStr = game.getDate();
                    LocalDate gameDate = LocalDate.parse(dateStr.substring(0, 10));
                    
                    boolean inRange = !gameDate.isBefore(start) && !gameDate.isAfter(end);
                    boolean teamMatches = upperCaseTeams.contains(game.getHomeTeam().toUpperCase());
                    
                    if (inRange && teamMatches) {
                        logger.info("✅ Match: {} on {}", game.getHomeTeam(), gameDate);
                    }
                    
                    return inRange && teamMatches;
                } catch (Exception e) {
                    logger.error("Error processing game: {}", game, e);
                    return false;
                }
            })
            .toList();
        
        logger.info("Filtered game count: {}", filteredGames.size());
        return filteredGames;
    }
}

