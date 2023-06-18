package com.example.projekt_pai2_isi_server.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@ResponseBody
public class UserController {

    @Autowired
    private  UserServices userServices;

    //pobranie wszystkich użytkowników aplikacji
    @GetMapping("/all")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        try {
            List<UserModel> users = userServices.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //Rejestracja nowego uzytkownika do aplikacji
    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody UserModel user) {
        try {
            userServices.addUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserModel user) {
        try {
            boolean isLoggedIn = userServices.login(user.getEmail(), user.getPassword());
            if (isLoggedIn) {
                // Pobierz identyfikator użytkownika
                String userId = userServices.getUserIdByEmail(user.getEmail());

                // Pobierz rolę użytkownika
                String userRole = userServices.getUserRoleByEmail(user.getEmail());

                // Zwróć odpowiedź zawierającą identyfikator użytkownika i rolę
                return ResponseEntity.ok().body("{\"userId\":\"" + userId + "\", \"role\":\"" + userRole + "\"}");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\":\"Nieprawidłowy email lub hasło\"}");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("{\"message\":\"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/changePassword/{userId}")
    public ResponseEntity<Object> changePassword(@PathVariable String userId,
                                                 @RequestBody Map<String, String> passwordData) {
        try {
            String oldPassword = passwordData.get("oldPassword");
            String newPassword = passwordData.get("newPassword");

            boolean isPasswordChanged = userServices.changePassword(userId, oldPassword, newPassword);
            if (isPasswordChanged) {
                return ResponseEntity.ok().body("{\"message\":\"Hasło zostało pomyślnie zmienione\"}");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\":\"Nie udało się zmienić hasła. Sprawdź poprawność podanych danych\"}");
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/blockUser")
    public ResponseEntity<String> blockUser(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            boolean isBlocked = userServices.blockUser(email);
            if (isBlocked) {
                return ResponseEntity.ok().body("{\"message\":\"Użytkonwik został zablokowany\"}");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\":\"Nie udało się zablokowac użytkownika\"}");
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/unblockUser")
    public ResponseEntity<String> unblockUser(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            boolean isUnblocked = userServices.unblockUser(email);
            if (isUnblocked) {
                return ResponseEntity.ok().body("{\"message\":\"Użytkownik został odblokowany\"}");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\":\"Nie udało się odblokować użytkownika\"}");
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public static class TokenObject {
        public String idToken;
    }

    @PostMapping("/login/google")
    public ResponseEntity<?> googleLogin(@RequestBody TokenObject tokenObject) {
        System.out.println("Odebrany token: " + tokenObject.idToken);
        try {
            UserModel user = userServices.googleLogin(tokenObject.idToken);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            System.out.println("Błąd przy logowaniu Google: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (GeneralSecurityException | IOException e) {
            System.out.println("Błąd przy logowaniu Google: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
