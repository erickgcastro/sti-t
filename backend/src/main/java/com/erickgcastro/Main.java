
package com.erickgcastro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication(scanBasePackages = {
    "com.erickgcastro.application", 
    "com.erickgcastro.domain", 
    "com.erickgcastro.infrastructure", 
    "com.erickgcastro.presentation",
    "com.erickgcastro.config",
})
@EntityScan("com.erickgcastro.domain.entities")
@EnableJpaRepositories("com.erickgcastro.infrastructure.repositories")
@RestController
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @GetMapping("/")
    public String hello() {
        return "ping";
    }
}
