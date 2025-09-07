package com.fitness.activityservice.service;

import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityResponse;
import com.fitness.activityservice.model.Activity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {
    @Autowired
    private final ActivityRepository activityRepository;
    private  final KafkaTemplate<String, Activity> kafkaTemplate;

    @Value("${kafka.topic.name}")
    private String topicName;

    private final UserValidationService userValidationService;
    public ActivityResponse trackActivity(ActivityRequest request) {
        Boolean isValidUser = userValidationService.validateUser(request.getUserId());
        if (!isValidUser){
            throw new RuntimeException("Invalid User: " + request.getUserId());
        }
        Activity activity = Activity.builder()
                .userId(request.getUserId())
                .type(request.getType())
                .duration(request.getDuration())
                .caloriesBurned(request.getCaloriesBurned())
                .startTime(request.getStartTime())
                .additionalMetrices(request.getAdditionalMetrices())
                .build();
        Activity savedActivity = activityRepository.save(activity);
        try {
            kafkaTemplate.send(topicName, savedActivity.getUserId(), savedActivity);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return mapToResponse(savedActivity);
    }

    private ActivityResponse mapToResponse(Activity activity) {
        ActivityResponse response = new ActivityResponse();
        response.setId(activity.getId());
        response.setUserId(activity.getUserId());
        response.setType(activity.getType());
        response.setDuration(activity.getDuration());
        response.setCaloriesBurned(activity.getCaloriesBurned());
        response.setStartTime(activity.getStartTime());
        response.setAdditionalMetrices(activity.getAdditionalMetrices());
        response.setCreatedAt(activity.getCreatedAt());
        response.setUpdatedAt(activity.getUpdatedAt());
        return response;
    }


    public List<ActivityResponse> getUserActivities(String userId) {
        List<Activity> activityList =   activityRepository.findByUserId(userId);
        return activityList.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toUnmodifiableList());


    }
}
