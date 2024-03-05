package com.PlannerApp.PlannerApp.Controller;

import org.apache.ibatis.annotations.Insert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/hello")
    public String getHelloMessage(){
        return "Hello world";
    }

    @PostMapping("/{user_id}/event/create")
    public String createEvent(){
        return "Event created";
    }

}
