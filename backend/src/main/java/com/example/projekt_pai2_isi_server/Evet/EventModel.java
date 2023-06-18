package com.example.projekt_pai2_isi_server.Evet;

import com.example.projekt_pai2_isi_server.User.UserModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "events")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventModel {
    @Id
    private String eventId;
    private String title;
    private String description;
    private String image;
    private String startDate;
    private String endDate;
    private String location;
    private String category;
    private int availableTickets;
    private int soldTickets;
    private Double ticketPrice;
    private List<UserModel> attendees = new ArrayList<>();

    public void addAttendee(UserModel attendee) {
        // dodajemy użytkownika do listy
        this.attendees.add(attendee);
    }

    public void removeAttendee(UserModel attendee) {
        // usuwamy użytkownika z listy
        this.attendees.remove(attendee);
    }

    public String getId() {
        return this.eventId;
    }
}