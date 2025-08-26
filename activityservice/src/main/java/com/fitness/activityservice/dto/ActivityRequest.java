package com.fitness.activityservice.dto;

import com.fitness.activityservice.model.ActivityType;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Map;
@Data
public class ActivityRequest {
    private String userId;
    private ActivityType type;
    private Integer caloriesBurned;
    private Integer duration;
    private LocalDateTime startTime;

    @Field("metrices")
    private Map<String, Object> additionalMetrices;

}
