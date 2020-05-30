package ua.com.scrumpoker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class ScrumPokerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScrumPokerApplication.class, args);
	}

}
