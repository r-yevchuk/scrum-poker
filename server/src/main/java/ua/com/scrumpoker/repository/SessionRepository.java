package ua.com.scrumpoker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.scrumpoker.models.Session;

public interface SessionRepository extends JpaRepository<Session, Long> {
}
