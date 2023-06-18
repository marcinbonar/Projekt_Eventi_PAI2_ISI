package com.example.projekt_pai2_isi_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class ProjektPai2IsiServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjektPai2IsiServerApplication.class, args);
    }

}
