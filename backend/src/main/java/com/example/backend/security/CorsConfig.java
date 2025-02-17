package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{
    
    @Bean
public WebMvcConfigurer corsConfigurer(){
    System.out.println("CORS Config Loaded ✅");
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry){
            System.out.println("Applying CORS Settings"); 
            registry.addMapping("/**")
                     .allowedOrigins("http://localhost:5173", "https://roadtriphelper.netlify.app", "https://roadtriphelper.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
       