package com.example.projekt_pai2_isi_server.Evet;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EventRepository extends MongoRepository<EventModel, String> {

    String findByTitle(String title);
}
