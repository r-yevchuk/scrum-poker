package ua.com.scrumpoker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import ua.com.scrumpoker.models.Session;

import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Long> {

    @Query("select s from Session s where s.id = :id and s.isDeleted = false")
    Optional<Session> findById(Long id);

    @Modifying
    @Query("update Session s set s.isDeleted = true where s.id = :id")
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    void markAsDeleted(@Param("id") long id);
}
