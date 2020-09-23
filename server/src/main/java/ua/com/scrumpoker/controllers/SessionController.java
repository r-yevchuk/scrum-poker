package ua.com.scrumpoker.controllers;

import org.hibernate.Hibernate;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ua.com.scrumpoker.models.Session;
import ua.com.scrumpoker.service.SessionService;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api/session")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable Long id) {
        Optional<Session> result = sessionService.getSessionById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent()
                .build());
    }

    @PostMapping
    public ResponseEntity<Session> createSession(@Valid @RequestBody Session session) {
        try {
            sessionService.saveSession(session);
            return ResponseEntity.created(new URI("/api/session")).body(session);
        } catch (URISyntaxException | IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Session> deleteSessionById(@PathVariable Long id) {
        Optional<Session> result = sessionService.deleteSessionById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Transactional
    @MessageMapping("/add-user")
    @SendTo("/room/users")
    public Session greeting(Long id) {
        System.out.println(id);
        Optional<Session> result = sessionService.getSessionById(id);
        if (result.isPresent()) {
            Session session = result.get();
            Hibernate.initialize(session.getUsers());
            return session;
        } else {
            return null;
        }
    }
}
