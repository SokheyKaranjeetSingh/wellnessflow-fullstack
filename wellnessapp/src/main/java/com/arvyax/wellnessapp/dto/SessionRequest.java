package com.arvyax.wellnessapp.dto;

import lombok.Data;

@Data
public class SessionRequest {
    private Long id;
    private String title;
    private String tags;
    private String jsonFileUrl;
    private String description;
}