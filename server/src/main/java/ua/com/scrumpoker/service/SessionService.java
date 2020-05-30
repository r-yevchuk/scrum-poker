package ua.com.scrumpoker.service;

import ua.com.scrumpoker.models.Session;

import java.util.Optional;

public interface SessionService {
    void saveSession(Session session);

    Optional<Session> getSessionById(Long id);

    Optional<Session> deleteSessionById(Long id);

}
