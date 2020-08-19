package ua.com.scrumpoker.service.impl;

import org.springframework.stereotype.Service;
import ua.com.scrumpoker.models.Session;
import ua.com.scrumpoker.models.User;
import ua.com.scrumpoker.repository.UserRepository;
import ua.com.scrumpoker.service.UserService;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> deleteUserById(Long id) {
        Optional<User> result = getUserById(id);
        if (result.isPresent()) {
            User user = result.get();
            user.setDeleted(true);
            userRepository.save(user);
            return Optional.of(user);
        }
        return Optional.empty();
    }


}
