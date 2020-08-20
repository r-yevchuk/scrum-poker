package ua.com.scrumpoker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import ua.com.scrumpoker.models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.id = :id and u.isDeleted = false")
    Optional<User> findById(Long id);

    @Modifying
    @Query("update User u set u.isDeleted = true where u.id = :id")
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    void markAsDeleted(@Param("id") long id);
}
