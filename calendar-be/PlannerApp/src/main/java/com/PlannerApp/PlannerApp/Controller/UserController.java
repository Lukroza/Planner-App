package com.PlannerApp.PlannerApp.Controller;


import com.PlannerApp.PlannerApp.Models.User;
import com.PlannerApp.PlannerApp.Services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public void insertUser(@RequestBody User user){
        userService.insertUser(user.getUsername());
    }

    @GetMapping("/get/{username}")
    public UUID getUserIDByUsername(@PathVariable String username){
        System.out.println(username);
        return userService.getUserIDByUsername(username);
    }
}
