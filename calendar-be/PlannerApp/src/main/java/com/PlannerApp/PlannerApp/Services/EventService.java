package com.PlannerApp.PlannerApp.Services;

import com.PlannerApp.PlannerApp.Entities.EventEntity;
import com.PlannerApp.PlannerApp.Models.Event;
import com.PlannerApp.PlannerApp.Repositories.EventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {
    @Autowired
    private final EventRepository eventRepository;

    public void insertEvent(Event event){
        UUID eventId = UUID.randomUUID();
        eventRepository.insertEvent(
                EventEntity.builder()
                        .id(eventId)
                        .user_id(event.getUser_id())
                        .name(event.getName())
                        .description(event.getDescription())
                        .date(event.getDate())
                        .from(event.getFrom())
                        .to(event.getTo())
                        .attendees(event.getAttendees())
                        .build()
        );
    }
}
