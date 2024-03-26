package com.PlannerApp.PlannerApp.Controller;


import com.PlannerApp.PlannerApp.Models.User;
import com.PlannerApp.PlannerApp.Services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID insertUser(@RequestBody User user) {
        return userService.insertUser(user.getUsername());
    }

    @GetMapping("/get/{username}")
    public Optional<User> getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping("/get/group/{groupId}")
    public List<User> getGroupUsers(@PathVariable UUID groupId) {
        return userService.getGroupUsers(groupId);
    }

    @GetMapping("/get/id/{userId}")
    public Optional<User> getUserByID(@PathVariable UUID userId) {
        return userService.getUserByID(userId);
    }
}
