package com.example.projekt_pai2_isi_server.Evet;
import com.example.projekt_pai2_isi_server.Evet.EventModel;
import com.example.projekt_pai2_isi_server.Evet.EventRepository;
import com.example.projekt_pai2_isi_server.Ticket.PaymentStatus;
import com.example.projekt_pai2_isi_server.Ticket.Ticket;
import com.example.projekt_pai2_isi_server.User.*;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class EventServices {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;


    public List<EventModel> getAllEvents(){
        return eventRepository.findAll();
    }

    public EventModel getEventById(String _id){
        return eventRepository.findById(_id).orElse(null);
    }

    public EventModel addEvent(EventModel event) {
        // Sprawdź, czy dane wydarzenie już istnieje w bazie
        if (eventRepository.findByTitle(event.getTitle()) != null) {
            throw new IllegalArgumentException("Wydarzenie o takiej nazwie już istnieje");
        }

        // Dodaj nowe wydarzenie do bazy
        return eventRepository.save(event);
    }

    public boolean deleteEvent(String eventId) {
        Optional<EventModel> eventOpt = eventRepository.findById(eventId);

        if (!eventOpt.isPresent()) {
            return false;
        }

        EventModel event = eventOpt.get();

        // Usuń wydarzenie z repozytorium
        eventRepository.delete(event);

        return true;
    }

    //ADMIN-Zapłacenie offline biletu danego użytkownika przez Admina
    public void handleOfflinePaymentByAdmin(String userId, String eventId) throws Exception {
        Optional<UserModel> userOpt = userRepository.findById(userId);
        Optional<EventModel> eventOpt = eventRepository.findById(eventId);

        if (!userOpt.isPresent()) {
            throw new Exception("Użytkownik o podanym id: " + userId + " nie istnieje");
        }

        if (!eventOpt.isPresent()) {
            throw new Exception("Wydarzenie o podanym id: " + eventId + " nie istnieje");
        }

        UserModel user = userOpt.get();
        EventModel event = eventOpt.get();

        Optional<Ticket> ticketOpt = user.getTickets().stream()
                .filter(ticket -> ticket.getEvent().getEventId().equals(eventId))
                .findFirst();

        if (!ticketOpt.isPresent()) {
            throw new Exception("Użytkownik z id: " + userId + " nie ma biletu na wydarzenie o id: " + eventId);
        }

        Ticket ticket = ticketOpt.get();
        if (ticket.getPaymentStatus() != PaymentStatus.PENDING_OFFLINE_PAYMENT) {
            throw new Exception("Status płatności biletu nie jest PENDING_OFFLINE_PAYMENT.");
        }

        ticket.setPaymentStatus(PaymentStatus.PAID_OFFLINE);

        event.setAvailableTickets(event.getAvailableTickets() - 1);
        event.setSoldTickets(event.getSoldTickets() + 1);
        eventRepository.save(event);
        userRepository.save(user);
    }

    //USER-zapłacenie online za bilet na dane wydarzenie
    public Charge charge(String token, double amount) throws StripeException {
        // Tworzenie obiektu parametrów płatności
        ChargeCreateParams params = ChargeCreateParams.builder()
                .setCurrency("usd") // Ustaw walutę
                .setAmount((long) (amount * 100)) // Ustaw kwotę (w centach)
                .setDescription("Opłata za bilet") // Ustaw opis
                .setSource(token) // Ustaw token
                .build();

        // Wykonaj płatność
        return Charge.create(params);
    }

    //Zapisanie się na wydarzenie przez użytkownika i opłacenie biletu później w sposób offline
    public boolean signUpForEventAndSetPendingPayment(String userId, String eventId) {
        // Znajdź użytkownika i wydarzenie w repozytoriach
        Optional<UserModel> userOpt = userRepository.findById(userId);
        Optional<EventModel> eventOpt = eventRepository.findById(eventId);

        // Sprawdź, czy użytkownik i wydarzenie istnieją
        if (!userOpt.isPresent() || !eventOpt.isPresent()) {
            return false;
        }

        UserModel user = userOpt.get();
        EventModel event = eventOpt.get();

        // Sprawdź, czy użytkownik już jest zapisany na wydarzenie
        if (user.getTickets().stream().anyMatch(ticket -> ticket.getEvent().getEventId().equals(eventId))) {
            // Użytkownik jest już zapisany na wydarzenie, zwróć informację
            throw new IllegalArgumentException("Użytkownik jest już zapisany na to wydarzenie");
        }

        // Sprawdź, czy jest jeszcze wolne miejsce na wydarzeniu
        if (event.getAvailableTickets() <= 0) {
            // Brak wolnych miejsc na wydarzeniu, zwróć informację
            throw new IllegalArgumentException("Brak wolnych miejsc na to wydarzenie");
        }

        // Utwórz bilet z ustawionym statusem PENDING_OFFLINE_PAYMENT
        Ticket ticket = new Ticket();
        ticket.setTicketId(new ObjectId().toString());
        ticket.setEvent(event);
        ticket.setPaymentStatus(PaymentStatus.PENDING_OFFLINE_PAYMENT);

        // Dodaj bilet do listy biletów użytkownika
        user.getTickets().add(ticket);

        // Zapisz zmiany w repozytorium użytkowników
        userRepository.save(user);

        return true;
    }

    //USER-zwraca listę eventów na jakie zapisał się dany użytkownik
    public List<UserEventResponse> getEventsForUser(String userId) {
        // Znajdź użytkownika w repozytorium
        Optional<UserModel> userOpt = userRepository.findById(userId);

        // Jeśli użytkownik nie istnieje, zwróć pustą listę
        if (!userOpt.isPresent()) {
            return Collections.emptyList();
        }

        UserModel user = userOpt.get();

        // Pobierz listę biletów użytkownika i przekształć ją na listę obiektów UserEventResponse
        return user.getTickets().stream()
                .map(ticket -> new UserEventResponse(ticket.getEvent(), ticket.getPaymentStatus()))
                .collect(Collectors.toList());
    }

    //ADMIN-pobranie wszytskich użytkowników wraz z wydarzeniami na jakie się zapisał dany użytkownik
    public List<UserWithEventsResponse> getAllUsersWithEvents() {
        List<UserModel> users = userRepository.findAll();

        return users.stream()
                .map(user -> new UserWithEventsResponse(
                        user,
                        user.getTickets().stream()
                                .map(ticket -> new UserEventDetails(ticket.getEvent(), ticket.getPaymentStatus()))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }



}




