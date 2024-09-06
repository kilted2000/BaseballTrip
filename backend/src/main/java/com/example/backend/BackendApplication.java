
// package com.example.backend;



// import java.util.List;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
// import org.springframework.boot.web.client.RestTemplateBuilder;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Profile;
// import org.springframework.http.HttpEntity;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpMethod;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.client.RestTemplate;

// import com.example.backend.games.Game;
// import com.fasterxml.jackson.core.type.TypeReference;
// import com.fasterxml.jackson.databind.ObjectMapper;

// @SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
// public class BackendApplication {

//     private static final Logger log = LoggerFactory.getLogger(BackendApplication.class);

//     public static void main(String[] args) {
//         SpringApplication.run(BackendApplication.class, args);
//     }

//     @Bean
//     public RestTemplate restTemplate(RestTemplateBuilder builder) {
//         return builder.build();
//     }

//     @Bean
//     @Profile("!test")
//     public CommandLineRunner run(RestTemplate restTemplate) throws Exception {
//         return args -> {
//             String apiKey = "5c5c0dea75d342ddbf81180756001c06";  

//             HttpHeaders headers = new HttpHeaders();
//             headers.set("Authorization", "Bearer " + apiKey);

//             HttpEntity<String> entity = new HttpEntity<>(headers);

        
//             ResponseEntity<String> response = restTemplate.exchange(
//                     "https://api.sportsdata.io/v3/mlb/scores/json/Games/2024?key=" + apiKey,  
//                     HttpMethod.GET,
//                     entity,
//                     String.class
//             );

//              String jsonResponse = response.getBody();
//             if (jsonResponse != null) {
//                 ObjectMapper mapper = new ObjectMapper();
//                 List<Game> games = mapper.readValue(jsonResponse, new TypeReference<List<Game>>() {});
// 				for (Game game : games) {
//                     log.info("Game Day: {}, Home Team: {}", game.getDayInCustomFormat(), game.HomeTeam());
//                 }
//             } else {
//                 log.warn("No games data received.");
//             }
//         };
//     }
// }
package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    // Provide a RestTemplate bean to be used for making external API calls
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}
