package com.example.projekt_pai2_isi_server.User;

import com.example.projekt_pai2_isi_server.Evet.EventModel;
import com.example.projekt_pai2_isi_server.Ticket.PaymentStatus;

public class UserEventResponse {
    private EventModel event;
    private PaymentStatus paymentStatus;

    public UserEventResponse(EventModel event, PaymentStatus paymentStatus) {
        this.event = event;
        this.paymentStatus = paymentStatus;
    }

    public EventModel getEvent() {
        return event;
    }

    public void setEvent(EventModel event) {
        this.event = event;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}