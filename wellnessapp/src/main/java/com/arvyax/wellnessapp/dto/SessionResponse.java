package com.arvyax.wellnessapp.dto;

import com.arvyax.wellnessapp.dto.UserResponse;
import com.arvyax.wellnessapp.enums.SessionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SessionResponse {
    private Long id;
    private String title;
    private String tags;
    private String jsonFileUrl;
    private String description;
    private SessionStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserResponse user;
}