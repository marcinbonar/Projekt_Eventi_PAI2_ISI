package com.example.projekt_pai2_isi_server.User;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserServices {
    private static final String CLIENT_ID = "585109083788-bqv3hnp30p2idpa54no8edgfi70f1q7b.apps.googleusercontent.com";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public void addUser(UserModel user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Użytkownik o podanym adresie email już istnieje");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setUserId(new ObjectId().toHexString());

        user.setRole("USER");

        userRepository.save(user);
    }

    public boolean login(String email, String password) {
        Optional<UserModel> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            if (user.isBlocked()) {
                throw new IllegalArgumentException("Twoje konto zostało zablokowane, skontaktuj się z administratorem w celu odblokowania");
            }
            return bCryptPasswordEncoder.matches(password, user.getPassword());
        }
        return false;
    }

    public boolean changePassword(String userId, String oldPassword, String newPassword) {
        Optional<UserModel> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            if (bCryptPasswordEncoder.matches(oldPassword, user.getPassword())) {
                String encodedNewPassword = bCryptPasswordEncoder.encode(newPassword);
                user.setPassword(encodedNewPassword);
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }

    public boolean blockUser(String email) {
        Optional<UserModel> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            user.setBlocked(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean unblockUser(String email) {
        Optional<UserModel> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            user.setBlocked(false);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public UserModel googleLogin(String idToken) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();

        GoogleIdToken token = verifier.verify(idToken);
        if (token != null) {
            GoogleIdToken.Payload payload = token.getPayload();
            String email = payload.getEmail();
            Optional<UserModel> userOptional = userRepository.findByEmail(email);

            UserModel user;
            if (userOptional.isPresent()) {
                user = userOptional.get();
            } else {
                user = new UserModel();
                user.setUserId(new ObjectId().toHexString());
                user.setEmail(email);
                user.setPassword(bCryptPasswordEncoder.encode("default_password"));
                user.setRole("USER");
                userRepository.save(user);
            }

            if (user.isBlocked()) {
                throw new IllegalArgumentException("Twoje konto zostało zablokowane, skontaktuj się z administratorem w celu odblokowania");
            }

            return user;
        } else {
            throw new IllegalArgumentException("Nieprawidłowy token ID");
        }
    }


    public String getUserIdByEmail(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Użytkownik o podanym adresie email nie istnieje"));
        return user.getUserId();
    }

    public String getUserRoleByEmail(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Użytkownik o podanym adresie email nie istnieje"));
        return user.getRole();
    }
}
