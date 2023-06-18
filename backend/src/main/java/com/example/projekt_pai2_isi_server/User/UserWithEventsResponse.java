package com.example.projekt_pai2_isi_server.User;

import java.util.List;

public class UserWithEventsResponse {
    private String userId;
    private String email;
    private String role;
    private List<UserEventDetails> events;

    public UserWithEventsResponse(UserModel user, List<UserEventDetails> events) {
        this.userId = user.getId();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.events = events;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<UserEventDetails> getEvents() {
        return events;
    }

    public void setEvents(List<UserEventDetails> events) {
        this.events = events;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}