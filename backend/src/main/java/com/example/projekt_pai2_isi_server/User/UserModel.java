package com.example.projekt_pai2_isi_server.User;
import com.example.projekt_pai2_isi_server.Ticket.Ticket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {
    @Id
    public String userId;
    private String name;
    private String surname;
    private String email;
    private String password;
    private boolean blocked;
    private String role;
    private List<Ticket> tickets = new ArrayList<>();

    public String getId() {
        return this.userId;
    }
}
