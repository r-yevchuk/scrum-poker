package ua.com.scrumpoker.service;

import ua.com.scrumpoker.models.User;

import java.util.Optional;

public interface UserService {
    void saveUser(User user);

    Optional<User> getUserById(Long id);

    Optional<User> deleteUserById(Long id);

}
