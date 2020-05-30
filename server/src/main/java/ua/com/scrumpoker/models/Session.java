package ua.com.scrumpoker.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.Instant;


@Getter
@Setter
@Entity
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Size(min = 8, max = 40)
    private String password;

    @ColumnDefault("false")
    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(name = "created_at")
    @CreationTimestamp
    private Instant createdAt;

    @Column(name = "modify_at")
    @UpdateTimestamp
    private Instant modifyAt;
}
