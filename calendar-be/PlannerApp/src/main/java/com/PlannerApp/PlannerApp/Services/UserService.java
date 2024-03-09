package com.PlannerApp.PlannerApp.Services;

import com.PlannerApp.PlannerApp.Entities.UserEntity;
import com.PlannerApp.PlannerApp.Models.User;
import com.PlannerApp.PlannerApp.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    public UUID insertUser(String username) {
        UUID userID = UUID.randomUUID();
        UserEntity userEntity = UserEntity.builder()
                .id(userID)
                .username(username)
                .build();

        userRepository.insertUser(userEntity);
        return userID;
    }

    public List<User> getGroupUsers(UUID groupId) {
        return userRepository.getGroupUsers(groupId).stream()
                .map(userEntity -> User.builder()
                        .id(userEntity.getId())
                        .username(userEntity.getUsername())
                        .group_id(userEntity.getGroup_id())
                        .build())
                .toList();
    }
}
