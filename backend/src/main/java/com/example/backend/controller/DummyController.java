package com.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class DummyController {
    @GetMapping("/dummy")
    public String dummy() {
        return "Dummy response";
    }
}
