package com.PlannerApp.PlannerApp.Controller;

import com.PlannerApp.PlannerApp.Entities.EventAttendeeEntity;
import com.PlannerApp.PlannerApp.Entities.EventEntity;
import com.PlannerApp.PlannerApp.Models.Event;
import com.PlannerApp.PlannerApp.Models.EventDetails;
import com.PlannerApp.PlannerApp.Models.EventHeader;
import com.PlannerApp.PlannerApp.Services.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

import java.util.List;
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

    @GetMapping("/getEvents/{userId}")
    public List<EventHeader> getEvents(@PathVariable UUID userId){
        return eventService.getEvents(userId);
    }

    @GetMapping("/getEventDetails/{eventId}")
    public EventDetails getEventDetails(@PathVariable UUID eventId){
        return eventService.getEventDetails(eventId);
    }

    @GetMapping("/countEventsByGroup/{groupId}/{date}")
    public long countEventsByGroupInMonth(
            @PathVariable UUID groupId,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM") Date date) {
        return eventService.countGroupEventsInMonth(groupId, date);}

    @PostMapping("/join")
    public void joinEvent(@RequestBody EventAttendeeEntity attendee){
        eventService.joinEvent(attendee);
    }

    @DeleteMapping("/leave")
    public ResponseEntity<String> leaveEvent(@RequestBody EventAttendeeEntity attendee){
        int rowsAffected = eventService.leaveEvent(attendee);
        if(rowsAffected == 1){
            return new ResponseEntity<>("Attendee successfully removed from the event.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Failed to find or remove attendee from the event.", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getAttendees/{eventId}")
    public List<String> getAttendees(@PathVariable UUID eventId){
        return eventService.getAttendees(eventId);
    }

}

