package com.example.projekt_pai2_isi_server.Evet;

import com.example.projekt_pai2_isi_server.Ticket.PaymentStatus;
import com.example.projekt_pai2_isi_server.Ticket.Ticket;
import com.example.projekt_pai2_isi_server.User.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.security.PermitAll;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.web.bind.annotation.PostMapping;



import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@PermitAll
@RestController
@RequestMapping("/api/event")
@ResponseBody
public class EventController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventServices eventServices;

    @GetMapping("/all")
    public ResponseEntity<List<EventModel>> getAll() {
        try {
            List<EventModel> events = eventServices.getAllEvents();
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventModel> getEventById(@PathVariable String id) {
        try {
            EventModel event = eventServices.getEventById(id);
            return new ResponseEntity<>(event, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/add-event")
    public ResponseEntity<String> addEvent(@RequestBody EventModel event) {
        try {
            // Sprawdź, czy wszystkie wymagane pola zostały ustawione
            if (event.getTitle() == null || event.getDescription() == null || event.getImage() == null ||
                    event.getStartDate() == null || event.getEndDate() == null || event.getLocation() == null ||
                    event.getCategory() == null || event.getTicketPrice() == null) {
                return new ResponseEntity<>("Nie wszystkie wymagane pola zostały ustawione", HttpStatus.BAD_REQUEST);
            }

            // Dodaj wydarzenie do bazy danych
            eventServices.addEvent(event);
            return new ResponseEntity(event, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("Wystąpił błąd: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete-event/{eventId}")
    public ResponseEntity<Object> deleteEvent(@PathVariable String eventId) {
        try {
            boolean success = eventServices.deleteEvent(eventId);
            if (success) {
                return new ResponseEntity<>(eventId, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Nie udało się usunąć wydarzenia", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Wystąpił błąd: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //ADMIN-zapłacenie za bilet danego użytkownika offline przez Admina
    @PostMapping("/{eventId}/buy-ticket/offline/{userId}")
    public ResponseEntity<String> payOffline(@PathVariable String eventId, @PathVariable String userId) {
        try {
            eventServices.handleOfflinePaymentByAdmin(userId, eventId);
            return ResponseEntity.ok().body("{\"message\":\"Płatność offline przebiegła pomyślnie\"}");
        } catch (Exception e) {
            // Dodajemy logowanie błędów, żeby zachować szczegóły na serwerze
            System.out.println("Wystąpił błąd: " + e.toString());

            // Zwracamy odpowiedź do klienta z szczegółową wiadomością o błędzie
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"message\":\"Wystąpił błąd: " + "Nie udało się wykonać operacji" + "\"}");
        }
    }

    //Zapłacenie biletu online za pomocą płatności online STRIPE
    @PostMapping("/{eventId}/buy-ticket/stripe/{userId}/{stripeToken}")
    public ResponseEntity<String> payWithStripe(@PathVariable String eventId, @PathVariable String userId, @PathVariable String stripeToken) {
        System.out.println("Received request with eventId: " + eventId + ", userId: " + userId + ", stripeToken: " + stripeToken);
        try {
            // Sprawdzenie czy token został dostarczony
            if (stripeToken == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"Token Stripe jest wymagany\"}");
            }

            EventModel event = eventServices.getEventById(eventId);
            UserModel user = userRepository.findById(userId).orElse(null);

            // Sprawdzenie czy user i event istnieje
            if (user == null || event == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"Nieprawidłowy użytkownik lub wydarzenie\"}");
            }

            // Sprawdzenie czy user kupił już bilet na to wydarzenie
            if(user.getTickets().stream().anyMatch(ticket -> ticket.getEvent().equals(event))){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"Użytkownik już kupił bilet na to wydarzenie\"}");
            }

            // Sprawdzenie czy są dostępne bilety na wydarzenie
            if (event.getAvailableTickets() <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"Brak dostępnych biletów\"}");
            }

            // Wykonanie płatności za pomocą STRIPE
            Charge charge = eventServices.charge(stripeToken, event.getTicketPrice());

            // Stworzenie biletu
            Ticket ticket = new Ticket();
            ticket.setTicketId(new ObjectId().toHexString());
            ticket.setEvent(event);
            ticket.setPaymentStatus(PaymentStatus.PAID_ONLINE);

            // Dodanie biletu to usera
            user.getTickets().add(ticket);
            userRepository.save(user);

            // Aktualizacja eventu
            event.setAvailableTickets(event.getAvailableTickets() - 1);
            event.setSoldTickets(event.getSoldTickets() + 1);
            eventRepository.save(event);

            String message = "Płatność Stripe została zakończona pomyślnie, bilet został zakupiony";
            return ResponseEntity.status(HttpStatus.OK).body("{\"message\":\"" + message + "\"}");
        } catch (StripeException e) {
            String message = "Błąd podczas zapisywania się na wydarzenie";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"" + message + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"" + e.getMessage() + "\"}");
        }
    }

    //USER-Zapisanie na wydarzenie z możliwością płatności później OFFLINE
    @PostMapping("/signUp/{userId}/{eventId}")
    public ResponseEntity<Object> signUpForEventAndSetPendingPayment(@PathVariable String userId, @PathVariable String eventId) {
        try {
            boolean success = eventServices.signUpForEventAndSetPendingPayment(userId, eventId);

            if (success) {
                String message = "Zapisano na wydarzenie z możliwością płatności na miejscu";
                return ResponseEntity.ok().body("{\"message\":\"" + message + "\"}");
            } else {
                String message = "Błąd podczas zapisywania się na wydarzenie";
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"" + message + "\"}");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"" + e.getMessage() + "\"}");
        }
    }

    //USER-Pobranie wszytskich wydarzeń na jakie dany user się zapisał
    @GetMapping("/userEvents/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getUserEvents(@PathVariable("userId") String userId) {
        List<UserEventResponse> eventsWithPaymentStatus = eventServices.getEventsForUser(userId);

        List<Map<String, Object>> eventsWithPaymentStatusMap = eventsWithPaymentStatus.stream()
                .map(userEventResponse -> {
                    Map<String, Object> eventMap = new ObjectMapper().convertValue(userEventResponse.getEvent(), Map.class);
                    eventMap.put("paymentStatus", userEventResponse.getPaymentStatus());
                    return eventMap;
                })
                .collect(Collectors.toList());

        return new ResponseEntity<>(eventsWithPaymentStatusMap, HttpStatus.OK);
    }

    //ADMIN-Zwrócenie wszytskich userów wraz z wydarzeniami na które dany user się zapisał
    @GetMapping("/usersWithEvents")
    public ResponseEntity<List<UserWithEventsResponse>> getUsersWithEvents() {
        List<UserWithEventsResponse> usersWithEvents = eventServices.getAllUsersWithEvents();
        return new ResponseEntity<>(usersWithEvents, HttpStatus.OK);
    }

    //ADMIN-zwrócenie wszystkich wydarzeń wraz z liczbę sprzedanych biletów
    @GetMapping("/solidTicketForEvents")
    public ResponseEntity<List<EventNameAndSoldTicketsCount>> getAllEventsWithSoldTicketsCount() {
        try {
            List<EventModel> events = eventServices.getAllEvents();
            List<EventNameAndSoldTicketsCount> eventsWithSoldTicketsCount = events.stream()
                    .map(event -> new EventNameAndSoldTicketsCount(event.getTitle(), event.getSoldTickets()))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(eventsWithSoldTicketsCount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}



