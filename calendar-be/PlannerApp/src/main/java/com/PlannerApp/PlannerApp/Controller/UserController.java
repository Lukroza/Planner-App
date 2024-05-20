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
import java.util.regex.Pattern;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> insertUser(@RequestBody User user) {
        System.out.println(user);
        String username = user.getUsername();
        if (username == null || username.isEmpty()) {
            return new ResponseEntity<>("Must enter a username", HttpStatus.BAD_REQUEST);
        }
        Pattern invalidCharsPattern = Pattern.compile("[\";:,()!?]");
        if (invalidCharsPattern.matcher(username).find()) {
            return new ResponseEntity<>("Invalid symbols in username (\";:,()!?)", HttpStatus.BAD_REQUEST);
        } else {
            Optional<User> existingUser = userService.getUserByUsername(username);
            if (existingUser.isPresent()) {
                return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
            } else {
                UUID userId = userService.insertUser(username);
                return new ResponseEntity<>(userId, HttpStatus.CREATED);
            }
        }
    }
    @GetMapping("/get/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.getUserByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
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
