package com.example.projekt_pai2_isi_server.UserTest;

import com.example.projekt_pai2_isi_server.User.UserModel;
import com.example.projekt_pai2_isi_server.User.UserRepository;
import com.example.projekt_pai2_isi_server.User.UserServices;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServicesTest {

    @InjectMocks
    private UserServices userServices;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private UserModel testUser;

    @BeforeEach
    public void setUp() {
        testUser = new UserModel();
        testUser.setUserId("testUserId");
        testUser.setEmail("test@example.com");
        testUser.setPassword("testPassword");
    }

    @Test
    public void testAddUser() {
        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.empty());
        when(bCryptPasswordEncoder.encode(testUser.getPassword())).thenReturn("encodedPassword");

        userServices.addUser(testUser);

        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    public void testLoginSuccess() {
        String rawPassword = "testPassword";
        String encodedPassword = "encodedPassword";

        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));
        when(bCryptPasswordEncoder.matches(rawPassword, encodedPassword)).thenReturn(true);

        testUser.setPassword(encodedPassword);
        boolean isLoggedIn = userServices.login(testUser.getEmail(), rawPassword);

        assertTrue(isLoggedIn);
    }

    @Test
    public void testLoginFailure() {
        String wrongPassword = "wrongPassword";

        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));
        when(bCryptPasswordEncoder.matches(wrongPassword, testUser.getPassword())).thenReturn(false);

        boolean isLoggedIn = userServices.login(testUser.getEmail(), wrongPassword);

        assertFalse(isLoggedIn);
    }


    @Test
    public void testBlockUserSuccess() {
        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));

        boolean isBlocked = userServices.blockUser(testUser.getEmail());

        assertTrue(isBlocked);
        assertTrue(testUser.isBlocked());
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    public void testUnblockUserSuccess() {
        testUser.setBlocked(true);
        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));

        boolean isUnblocked = userServices.unblockUser(testUser.getEmail());

        assertTrue(isUnblocked);
        assertFalse(testUser.isBlocked());
        verify(userRepository, times(1)).save(testUser);
    }
}