package ua.com.scrumpoker.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
public class Session extends BaseEntity {
    @NotBlank
    private String name;

    @NotBlank
    private String cards;

    @Size(min = 8, max = 40)
    private String password;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "session")
    private List<User> users = new ArrayList<>();
}
