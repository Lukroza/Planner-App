package com.PlannerApp.PlannerApp.Controller;


import com.PlannerApp.PlannerApp.Models.User;
import com.PlannerApp.PlannerApp.Services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @GetMapping("/get/group/{groupId}")
    public List<User> getUsersByGroupID(@PathVariable UUID groupId) {
        return userService.getGroupUsers(groupId);
    }
}
