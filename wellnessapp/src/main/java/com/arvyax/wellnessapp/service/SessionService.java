package com.arvyax.wellnessapp.service;

import com.arvyax.wellnessapp.dto.SessionRequest;
import com.arvyax.wellnessapp.entity.Session;
import com.arvyax.wellnessapp.entity.User;
import com.arvyax.wellnessapp.enums.SessionStatus;
import com.arvyax.wellnessapp.repository.SessionRepository;
import com.arvyax.wellnessapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;

    public Session saveDraft(SessionRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Session session;
        if (request.getId() != null) {
            session = sessionRepository.findByIdAndUserId(request.getId(), userId)
                    .orElseThrow(() -> new RuntimeException("Session not found"));
        } else {
            session = new Session();
            session.setUser(user);
            session.setStatus(SessionStatus.DRAFT);
        }

        session.setTitle(request.getTitle());
        session.setTags(request.getTags());
        session.setJsonFileUrl(request.getJsonFileUrl());
        session.setDescription(request.getDescription());

        return sessionRepository.save(session);
    }

    public Session publishSession(Long sessionId, Long userId) {
        Session session = sessionRepository.findByIdAndUserId(sessionId, userId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setStatus(SessionStatus.PUBLISHED);
        return sessionRepository.save(session);
    }

    public List<Session> getPublicSessions() {
        return sessionRepository.findByStatus(SessionStatus.PUBLISHED);
    }

    public List<Session> getMySessions(Long userId) {
        return sessionRepository.findByUserId(userId);
    }

    public Session getSession(Long sessionId, Long userId) {
        return sessionRepository.findByIdAndUserId(sessionId, userId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
    }
    public void deleteSession(Long sessionId, Long userId) {
        Session session = sessionRepository.findByIdAndUserId(sessionId, userId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        sessionRepository.delete(session);
    }

    public Session updateSession(SessionRequest request, Long userId) {
        Session session = sessionRepository.findByIdAndUserId(request.getId(), userId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setTitle(request.getTitle());
        session.setTags(request.getTags());
        session.setJsonFileUrl(request.getJsonFileUrl());
        session.setDescription(request.getDescription());
        // Optionally allow updating status if needed
        return sessionRepository.save(session);
    }
}