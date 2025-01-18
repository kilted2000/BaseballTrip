

package com.example.backend.service;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.backend.model.GameModel;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GameService {

    @Autowired
    private RestTemplate restTemplate;

    private final String apiKey = "5c5c0dea75d342ddbf81180756001c06";

    // public List<GameModel> fetchGamesFromApi() {
    //     int currentSeason = Year.now().getValue();
        
    //     String url = "https://api.sportsdata.io/v3/mlb/scores/json/Games/" + currentSeason + "?key=" + apiKey;

    //     HttpHeaders headers = new HttpHeaders();
    //     headers.set("Authorization", "Bearer " + apiKey);

    //     HttpEntity<String> entity = new HttpEntity<>(headers);
    //     ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);


    //     List<Game> games = new ArrayList<>();
    //     String jsonResponse = response.getBody();
    //     if (jsonResponse != null) {
    //         ObjectMapper mapper = new ObjectMapper();
    //         try {
    //             games = mapper.readValue(jsonResponse, new TypeReference<List<Game>>() {});
    //         } catch (JsonProcessingException e) {
                
                
    //         }
    //     }
    //     return games;
    // }

    public List<GameModel> fetchGamesFromApi() {
    int currentSeason = Year.now().getValue();
    String url = "https://api.sportsdata.io/v3/mlb/scores/json/Games/" + currentSeason + "?key=" + apiKey;

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + apiKey);

    HttpEntity<String> entity = new HttpEntity<>(headers);

    try {
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        String jsonResponse = response.getBody();

        if (jsonResponse != null) {
            ObjectMapper mapper = new ObjectMapper();

            // Deserialize directly into List<GameModel>
            return mapper.readValue(jsonResponse, new TypeReference<List<GameModel>>() {});
        }
    } catch (Exception e) {
        System.err.println("Error fetching games from API: " + e.getMessage());
    }

    return new ArrayList<>(); 
}

}
