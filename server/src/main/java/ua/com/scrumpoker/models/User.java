package ua.com.scrumpoker.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Entity
public class User extends BaseEntity {

    @NotBlank
    private String name;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "session", referencedColumnName = "id")
    private Session session;
}
