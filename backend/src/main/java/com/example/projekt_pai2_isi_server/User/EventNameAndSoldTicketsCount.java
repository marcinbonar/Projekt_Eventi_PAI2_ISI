package com.example.projekt_pai2_isi_server.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventNameAndSoldTicketsCount {
    private String eventName;
    private int soldTicketsCount;
}
