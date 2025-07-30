package com.arvyax.wellnessapp.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
}