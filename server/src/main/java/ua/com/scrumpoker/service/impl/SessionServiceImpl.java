package ua.com.scrumpoker.service.impl;

import org.springframework.stereotype.Service;
import ua.com.scrumpoker.models.Session;
import ua.com.scrumpoker.repository.SessionRepository;
import ua.com.scrumpoker.service.SessionService;

import java.util.Optional;

@Service
public class SessionServiceImpl implements SessionService {
    private final SessionRepository sessionRepository;

    public SessionServiceImpl(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Override
    public void saveSession(Session session) {
        sessionRepository.save(session);
    }

    @Override
    public Optional<Session> getSessionById(Long id) {
        return sessionRepository.findById(id);
    }

    @Override
    public Optional<Session> deleteSessionById(Long id) {
        Optional<Session> result = getSessionById(id);
        if (result.isPresent()) {
            Session session = result.get();
            session.setDeleted(true);
            saveSession(session);
            return Optional.of(session);
        }
        return Optional.empty();
    }
}
