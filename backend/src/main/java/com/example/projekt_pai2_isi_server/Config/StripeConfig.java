package com.example.projekt_pai2_isi_server.Config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;



@Configuration
public class StripeConfig {

    @Value("${stripe.secret.key}")
    private String secretKey;

    @Value("${stripe.public.key}")
    private String publicKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    public String getPublicKey() {
        return publicKey;
    }
}