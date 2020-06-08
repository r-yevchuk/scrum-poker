package ua.com.scrumpoker.service;

import ua.com.scrumpoker.models.Session;
import ua.com.scrumpoker.models.User;

import java.util.Optional;

public interface UserService {
    void saveUser(User user);

    Optional<Session> getSessionById(Long id);

    Optional<Session> deleteSessionById(Long id);

}
