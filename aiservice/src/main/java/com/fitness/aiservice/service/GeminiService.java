package com.fitness.aiservice.service;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;


@Service
public class GeminiService {

    private final WebClient webClient;
    private final String geminiApiUrl;
    private final String geminiApiKey;

    public GeminiService(WebClient.Builder webClientBuilder,
                         @Value("${gemini.api.url}") String geminiApiUrl,
                         @Value("${gemini.api.key}") String geminiApiKey) {
        this.webClient = webClientBuilder.build();
        this.geminiApiUrl = geminiApiUrl;
        this.geminiApiKey = geminiApiKey;
    }
    public String getRecommendations(String details){
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of("text", details)
                                }
                        )
                }
        );
        String response = webClient.post()
                .uri(geminiApiUrl)
                .header("Content-Type", "application/json")
                .header("X-goog-api-key", geminiApiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return response;
    }
}


//public class GeminiService {
//    private final WebClient webClient;
//    @Value("${gemini.api.url}")
//    private String geminiApiUrl;
//    @Value("${gemini.api.key}")
//    private String geminiApiKey;
//    public GeminiService(WebClient.Builder webClientBuilder){
//        this.webClient = webClientBuilder.build();
//    }
//
//}
