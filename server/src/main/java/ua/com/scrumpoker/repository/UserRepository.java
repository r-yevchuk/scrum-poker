package ua.com.scrumpoker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.scrumpoker.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
