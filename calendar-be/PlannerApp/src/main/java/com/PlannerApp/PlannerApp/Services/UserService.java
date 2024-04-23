package com.PlannerApp.PlannerApp.Services;

import com.PlannerApp.PlannerApp.Entities.UserEntity;
import com.PlannerApp.PlannerApp.Models.User;
import com.PlannerApp.PlannerApp.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    public Optional<User> getUserByUsername(String username) {
        return userRepository.getUserByUsername(username)
                .map(userEntity -> User.builder()
                        .id(userEntity.getId())
                        .username(userEntity.getUsername())
                        .group_id(userEntity.getGroup_id())
                        .build());
    }
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
    public Optional<User> getUserByID(UUID userId) {
        return userRepository.getUserById(userId)
                .map(userEntity -> User.builder()
                        .id(userEntity.getId())
                        .username(userEntity.getUsername())
                        .group_id(userEntity.getGroup_id())
                        .build());
    }
    public int countUsersWithSimilarName(String baseName) {
        String searchPattern = baseName + "%";
        List<UserEntity> users = userRepository.findUsersByUsernamePattern(searchPattern);
        int count = 0;

        for (UserEntity user : users) {
            String username = user.getUsername();

            if (username.toLowerCase().startsWith(baseName.toLowerCase())) {
                count++;
            }
        }

        return count;
    }
    
}
