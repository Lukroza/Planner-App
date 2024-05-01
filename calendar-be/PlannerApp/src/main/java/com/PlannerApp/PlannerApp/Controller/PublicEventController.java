package com.PlannerApp.PlannerApp.Controller;

import com.PlannerApp.PlannerApp.Models.EventHeader;
import com.PlannerApp.PlannerApp.Models.PublicEventDetails;
import com.PlannerApp.PlannerApp.Services.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/event/public")
@RequiredArgsConstructor
@Slf4j
public class PublicEventController {

    private final EventService eventService;

    @GetMapping("/get/all")
    public List<EventHeader> getPublicEvents(){
        return eventService.getPublicEvents();
    }

    @GetMapping("/get/details/{eventId}")
    public PublicEventDetails getPublicEventDetails(@PathVariable UUID eventId){
        return eventService.getPublicEventDetails(eventId);
    }

    @PutMapping("/togglePublic/{eventId}")
    public void togglePublic(@PathVariable UUID eventId){
        eventService.togglePublic(eventId);
    }
}
