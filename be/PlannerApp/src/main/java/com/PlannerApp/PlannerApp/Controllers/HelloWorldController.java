package com.PlannerApp.PlannerApp.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/hello")
    public String Hello(){
        System.out.println("something");
        return "Hello from API";
    }
}
