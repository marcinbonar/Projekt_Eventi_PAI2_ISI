package com.example.projekt_pai2_isi_server.Ticket;

import com.example.projekt_pai2_isi_server.Evet.EventModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
    private String ticketId;
    private EventModel event;
    private PaymentStatus paymentStatus;
}

