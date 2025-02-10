package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{
    
    @Bean
public WebMvcConfigurer corsConfigurer(){
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry){
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173", "https://roadtriphelper.netlify.app", "http://roadtriphelper.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
        }
    };
}

    
}
