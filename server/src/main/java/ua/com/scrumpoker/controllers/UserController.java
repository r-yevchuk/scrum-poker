package ua.com.scrumpoker.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.com.scrumpoker.models.User;
import ua.com.scrumpoker.service.UserService;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        try {
            userService.saveUser(user);
            return ResponseEntity.created(new URI("/api/session")).body(user);
        } catch (URISyntaxException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> result = userService.getUserById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound()
                .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<User> deleteUserById(@PathVariable Long id) {
        Optional<User> result = userService.deleteUserById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
