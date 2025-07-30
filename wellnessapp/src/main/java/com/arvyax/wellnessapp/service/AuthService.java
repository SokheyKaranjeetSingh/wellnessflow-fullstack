package com.arvyax.wellnessapp.service;

import com.arvyax.wellnessapp.dto.LoginRequest;
import com.arvyax.wellnessapp.dto.RegisterRequest;
import com.arvyax.wellnessapp.dto.AuthResponse;
import com.arvyax.wellnessapp.entity.User;
import com.arvyax.wellnessapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        // Save user to database
        User savedUser = userRepository.save(user);

        // Generate JWT token for the new user
        String token = jwtService.generateToken(savedUser.getId(), savedUser.getEmail());

        // Return response with token and user info
        return new AuthResponse(token, savedUser.getId(), savedUser.getEmail());
    }

    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate JWT token for authenticated user
        String token = jwtService.generateToken(user.getId(), user.getEmail());

        // Return response with token and user info
        return new AuthResponse(token, user.getId(), user.getEmail());
    }
}