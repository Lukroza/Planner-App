package com.PlannerApp.PlannerApp.Services;

import com.PlannerApp.PlannerApp.Entities.UserEntity;
import com.PlannerApp.PlannerApp.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    public void registerUser(String username) {
        UUID userID = UUID.randomUUID();
        UserEntity userEntity = UserEntity.builder()
                .user_id(userID) // Assuming the database user_id column is VARCHAR to store UUID as string.
                .username(username)
                .build();

        userRepository.registerUser(userEntity);
    }
}
