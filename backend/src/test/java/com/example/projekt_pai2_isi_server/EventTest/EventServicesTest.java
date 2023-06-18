package com.example.projekt_pai2_isi_server.EventTest;


import com.example.projekt_pai2_isi_server.Evet.EventModel;
import com.example.projekt_pai2_isi_server.Evet.EventRepository;
import com.example.projekt_pai2_isi_server.Evet.EventServices;
import com.example.projekt_pai2_isi_server.Ticket.PaymentStatus;
import com.example.projekt_pai2_isi_server.Ticket.Ticket;
import com.example.projekt_pai2_isi_server.User.UserEventResponse;
import com.example.projekt_pai2_isi_server.User.UserModel;
import com.example.projekt_pai2_isi_server.User.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class EventServicesTest {

    @InjectMocks
    private EventServices eventServices;

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllEvents() {
        EventModel event1 = new EventModel();
        EventModel event2 = new EventModel();
        when(eventRepository.findAll()).thenReturn(Arrays.asList(event1, event2));

        List<EventModel> events = eventServices.getAllEvents();
        assertEquals(2, events.size());
        verify(eventRepository, times(1)).findAll();
    }

    @Test
    public void testGetEventById() {
        String id = "testId";
        EventModel event = new EventModel();
        when(eventRepository.findById(id)).thenReturn(Optional.of(event));

        EventModel result = eventServices.getEventById(id);
        assertNotNull(result);
        assertEquals(event, result);
        verify(eventRepository, times(1)).findById(id);
    }

    @Test
    public void testSignUpForEventAndSetPendingPayment() {
        String userId = "testUserId";
        String eventId = "testEventId";

        UserModel user = new UserModel();
        user.setUserId(userId);

        EventModel event = new EventModel();
        event.setEventId(eventId);
        event.setAvailableTickets(5);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

        boolean result = eventServices.signUpForEventAndSetPendingPayment(userId, eventId);
        assertTrue(result);
        assertEquals(1, user.getTickets().size());
        Ticket ticket = user.getTickets().get(0);
        assertEquals(event, ticket.getEvent());
        assertEquals(PaymentStatus.PENDING_OFFLINE_PAYMENT, ticket.getPaymentStatus());
        verify(userRepository, times(1)).findById(userId);
        verify(eventRepository, times(1)).findById(eventId);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testDeleteEvent() {
        String eventId = "testEventId";
        EventModel event = new EventModel();
        event.setEventId(eventId);

        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

        boolean result = eventServices.deleteEvent(eventId);
        assertTrue(result);
        verify(eventRepository, times(1)).findById(eventId);
        verify(eventRepository, times(1)).delete(event);
    }

    @Test
    public void testHandleOfflinePaymentByAdmin() throws Exception {
        // Given
        String userId = "testUserId";
        String eventId = "testEventId";

        UserModel user = new UserModel();
        user.setUserId(userId);

        EventModel event = new EventModel();
        event.setEventId(eventId);
        event.setAvailableTickets(5);
        event.setSoldTickets(0);

        Ticket ticket = new Ticket();
        ticket.setEvent(event);
        ticket.setPaymentStatus(PaymentStatus.PENDING_OFFLINE_PAYMENT);
        user.getTickets().add(ticket);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

        // When
        eventServices.handleOfflinePaymentByAdmin(userId, eventId);

        // Then
        assertEquals(PaymentStatus.PAID_OFFLINE, ticket.getPaymentStatus());
        assertEquals(4, event.getAvailableTickets());
        assertEquals(1, event.getSoldTickets());

        verify(userRepository, times(1)).findById(userId);
        verify(eventRepository, times(1)).findById(eventId);
        verify(userRepository, times(1)).save(user);
        verify(eventRepository, times(1)).save(event);
    }

    @Test
    public void testGetEventsForUser() {

        String userId = "testUserId";

        UserModel user = new UserModel();
        user.setUserId(userId);

        EventModel event1 = new EventModel();
        event1.setEventId("event1Id");

        EventModel event2 = new EventModel();
        event2.setEventId("event2Id");

        Ticket ticket1 = new Ticket();
        ticket1.setEvent(event1);
        ticket1.setPaymentStatus(PaymentStatus.PENDING_OFFLINE_PAYMENT);

        Ticket ticket2 = new Ticket();
        ticket2.setEvent(event2);
        ticket2.setPaymentStatus(PaymentStatus.PAID_OFFLINE);

        user.getTickets().add(ticket1);
        user.getTickets().add(ticket2);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // When
        List<UserEventResponse> result = eventServices.getEventsForUser(userId);

        // Then
        assertEquals(2, result.size());
        assertEquals(event1, result.get(0).getEvent());
        assertEquals(PaymentStatus.PENDING_OFFLINE_PAYMENT, result.get(0).getPaymentStatus());
        assertEquals(event2, result.get(1).getEvent());
        assertEquals(PaymentStatus.PAID_OFFLINE, result.get(1).getPaymentStatus());

        verify(userRepository, times(1)).findById(userId);
    }



}
