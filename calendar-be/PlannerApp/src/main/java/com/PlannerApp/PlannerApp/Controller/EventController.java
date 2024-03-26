package com.PlannerApp.PlannerApp.Controller;

import com.PlannerApp.PlannerApp.Entities.EventEntity;
import com.PlannerApp.PlannerApp.Models.Event;
import com.PlannerApp.PlannerApp.Services.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

import java.util.UUID;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
@Slf4j
public class EventController {
    private final EventService eventService;

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public void insertEvent(@RequestBody Event event){
        eventService.insertEvent(event);
    }

    @GetMapping("/count")
    public Long countEventsOnDate(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date utilDate) {
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        return eventService.countEventsByDate(sqlDate);
    }
}

