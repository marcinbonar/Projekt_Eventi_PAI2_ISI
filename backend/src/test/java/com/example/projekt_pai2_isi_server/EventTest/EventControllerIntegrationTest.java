package com.example.projekt_pai2_isi_server.EventTest;

import com.example.projekt_pai2_isi_server.Evet.EventModel;
import com.example.projekt_pai2_isi_server.Evet.EventServices;
import com.example.projekt_pai2_isi_server.User.EventNameAndSoldTicketsCount;
import com.example.projekt_pai2_isi_server.User.UserWithEventsResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EventControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @MockBean
    private EventServices eventServices;

    @Test
    public void testGetAllEvents() {
        ResponseEntity<List> response = restTemplate.getForEntity("/api/event/all", List.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }
    @Test
    public void testGetUserEvents() {
        String userId = "64591f26199b445141dbf07b";

        ResponseEntity<List> response = restTemplate.getForEntity("/api/event/userEvents/" + userId, List.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isGreaterThanOrEqualTo(0);
    }
    @Test
    public void testAddEventMissingFields() {
        EventModel event = new EventModel();

        ResponseEntity<String> response = restTemplate.postForEntity("/api/event/add-event", event, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo("Nie wszystkie wymagane pola zostały ustawione");
    }

    @Test
    public void testPayOffline() throws Exception {
        String eventId = "testEventId";
        String userId = "testUserId";

        ResponseEntity<String> response = restTemplate.postForEntity("/api/event/" + eventId + "/buy-ticket/offline/" + userId, null, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("Płatność offline przebiegła pomyślnie");
    }

    @Test
    public void testPayOfflineFailure() throws Exception {
        String eventId = "testEventId";
        String userId = "testUserId";

        // Mock the service call to throw an exception
        doThrow(new Exception("test exception")).when(eventServices).handleOfflinePaymentByAdmin(userId, eventId);

        ResponseEntity<String> response = restTemplate.postForEntity("/api/event/" + eventId + "/buy-ticket/offline/" + userId, null, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).contains("Wystąpił błąd: Nie udało się wykonać operacji");
    }

    @Test
    public void testSignUpForEventAndSetPendingPayment_Success() throws Exception {
        String eventId = "testEventId";
        String userId = "testUserId";

        // Zakładamy, że metoda usługi zwraca prawdę
        when(eventServices.signUpForEventAndSetPendingPayment(userId, eventId)).thenReturn(true);

        ResponseEntity<String> response = restTemplate.postForEntity("/api/event/signUp/" + userId + "/" + eventId, null, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("Zapisano na wydarzenie z możliwością płatności na miejscu");
    }

    @Test
    public void testSignUpForEventAndSetPendingPayment_Failure() throws Exception {
        String eventId = "testEventId";
        String userId = "testUserId";

        // Zakładamy, że metoda usługi zwraca fałsz
        when(eventServices.signUpForEventAndSetPendingPayment(userId, eventId)).thenReturn(false);

        ResponseEntity<String> response = restTemplate.postForEntity("/api/event/signUp/" + userId + "/" + eventId, null, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).contains("Błąd podczas zapisywania się na wydarzenie");
    }

}
