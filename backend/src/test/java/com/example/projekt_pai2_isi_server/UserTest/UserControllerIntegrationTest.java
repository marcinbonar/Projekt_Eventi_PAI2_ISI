package com.example.projekt_pai2_isi_server.UserTest;

import com.example.projekt_pai2_isi_server.User.UserModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testGetAllUsers() {
        ResponseEntity<List> response = restTemplate.getForEntity("/api/user/all", List.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }

    @Test
    public void testBlockUser() {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", "test.user@example.com");

        ResponseEntity<String> response = restTemplate.postForEntity("/api/user/blockUser", requestBody, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void testUnblockUser() {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", "test.user@example.com");

        ResponseEntity<String> response = restTemplate.postForEntity("/api/user/unblockUser", requestBody, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void testAddUser_WithMissingFields() {
        // Tworzenie użytkownika do dodania
        UserModel user = new UserModel();
        user.setEmail("test.adduser@example.com");

        // Ustawianie nagłówków żądania
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Tworzenie żądania HTTP POST z niekompletnym ciałem użytkownika
        HttpEntity<UserModel> request = new HttpEntity<>(user, headers);

        // Wysłanie żądania i otrzymanie odpowiedzi
        ResponseEntity<String> response = restTemplate.postForEntity("/api/user/add", request, String.class);

        // Sprawdzanie poprawności odpowiedzi
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }







}