package com.fitness.aiservice.model;

import com.fitness.aiservice.model.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Activity {
    private String id;
    private String userId;
    private ActivityType type;
    private Integer caloriesBurned;
    private Integer duration;
    private LocalDateTime startTime;



    @Field("metrices")
    private Map<String, Object> additionalMetrices;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;



}

