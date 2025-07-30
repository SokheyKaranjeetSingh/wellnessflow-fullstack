package com.arvyax.wellnessapp.controller;

import com.arvyax.wellnessapp.dto.SessionRequest;
import com.arvyax.wellnessapp.entity.Session;
import com.arvyax.wellnessapp.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SessionController {

    private final SessionService sessionService;

    @GetMapping("/sessions")
    public ResponseEntity<List<Session>> getPublicSessions() {
        try {
            List<Session> sessions = sessionService.getPublicSessions();
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/my-sessions")
    public ResponseEntity<List<Session>> getMySessions(Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(401).build();
            }
            Long userId = (Long) authentication.getPrincipal();
            List<Session> sessions = sessionService.getMySessions(userId);
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/my-sessions/{id}")
    public ResponseEntity<Session> getMySession(@PathVariable Long id, Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(401).build();
            }
            Long userId = (Long) authentication.getPrincipal();
            Session session = sessionService.getSession(id, userId);
            return ResponseEntity.ok(session);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/my-sessions/save-draft")
    public ResponseEntity<Session> saveDraft(@RequestBody SessionRequest request, Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(401).build();
            }
            Long userId = (Long) authentication.getPrincipal();
            Session session = sessionService.saveDraft(request, userId);
            return ResponseEntity.ok(session);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/my-sessions/publish")
    public ResponseEntity<Session> publishSession(@RequestParam Long sessionId, Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(401).build();
            }
            Long userId = (Long) authentication.getPrincipal();
            Session session = sessionService.publishSession(sessionId, userId);
            return ResponseEntity.ok(session);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    @DeleteMapping("/my-sessions/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id, Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(401).build();
            }
            Long userId = (Long) authentication.getPrincipal();
            sessionService.deleteSession(id, userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/my-sessions/{id}")
    public ResponseEntity<Session> updateSession(@PathVariable Long id, @RequestBody SessionRequest request, Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(401).build();
            }
            Long userId = (Long) authentication.getPrincipal();
            request.setId(id); // Ensure the ID is set
            Session session = sessionService.updateSession(request, userId);
            return ResponseEntity.ok(session);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}