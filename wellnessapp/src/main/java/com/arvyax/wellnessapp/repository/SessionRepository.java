package com.arvyax.wellnessapp.repository;

import com.arvyax.wellnessapp.entity.Session;
import com.arvyax.wellnessapp.enums.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByStatus(SessionStatus status);
    List<Session> findByUserId(Long userId);
    Optional<Session> findByIdAndUserId(Long id, Long userId);
}