package com.example.projekt_pai2_isi_server.User;

import com.example.projekt_pai2_isi_server.Evet.EventModel;
import com.example.projekt_pai2_isi_server.Ticket.PaymentStatus;

public class UserEventDetails {
    private String eventId;
    private String title;
    private PaymentStatus paymentStatus;

    public UserEventDetails(EventModel event, PaymentStatus paymentStatus) {
        this.eventId = event.getId();
        this.title = event.getTitle();
        this.paymentStatus = paymentStatus;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}