package ua.com.scrumpoker.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Getter
@Setter
@Entity
public class Session extends BaseEntity{
    @NotBlank
    private String name;

    @NotBlank
    private String cards;

    @Size(min = 8, max = 40)
    private String password;
}
