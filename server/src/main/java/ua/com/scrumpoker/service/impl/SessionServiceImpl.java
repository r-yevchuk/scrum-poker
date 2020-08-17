package ua.com.scrumpoker.service.impl;

import org.springframework.stereotype.Service;
import ua.com.scrumpoker.config.Config;
import ua.com.scrumpoker.models.Session;
import ua.com.scrumpoker.repository.SessionRepository;
import ua.com.scrumpoker.service.SessionService;

import java.util.Arrays;
import java.util.Optional;

@Service
public class SessionServiceImpl implements SessionService {
    private final SessionRepository sessionRepository;

    public SessionServiceImpl(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Override
    public void saveSession(Session session) {
        String[] parts = session.getCards().split(" ");
        StringBuilder sb = new StringBuilder();
        String prefix = "";
        int cardsQuantity = 0;

        for(int i = 0; i < Config.CARDS.length; i++) {
            if(Arrays.asList(parts).contains(Config.CARDS[i])) {
                sb.append(prefix);
                prefix = " ";
                sb.append(Config.CARDS[i]);
                cardsQuantity ++;
            }
        }

        if (cardsQuantity > 2){
            session.setCards(sb.toString());
            sessionRepository.save(session);
        } else {
            throw new IllegalArgumentException("Session must contain at least 3 cards");
        }
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
            sessionRepository.save(session);
            return Optional.of(session);
        }
        return Optional.empty();
    }
}
