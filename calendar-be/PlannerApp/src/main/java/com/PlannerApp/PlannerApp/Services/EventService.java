package com.PlannerApp.PlannerApp.Services;

import com.PlannerApp.PlannerApp.Entities.EventEntity;
import com.PlannerApp.PlannerApp.Entities.UserEntity;
import com.PlannerApp.PlannerApp.Models.Event;
import com.PlannerApp.PlannerApp.Models.EventDetails;
import com.PlannerApp.PlannerApp.Models.EventHeader;
import com.PlannerApp.PlannerApp.Models.Group;
import com.PlannerApp.PlannerApp.Repositories.EventRepository;
import com.PlannerApp.PlannerApp.Repositories.GroupRepository;
import com.PlannerApp.PlannerApp.Repositories.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {
    @Autowired
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public void insertEvent(Event event){
        UUID eventId = UUID.randomUUID();
        eventRepository.insertEvent(
                EventEntity.builder()
                        .event_id(eventId)
                        .user_id(event.getUserId())
                        .event_name(event.getName())
                        .event_description(event.getDescription())
                        .date(event.getDate())
                        .time_from(event.getFrom())
                        .time_to(event.getTo())
                        .build()
        );
    }

    //returns All possible events
    public List<EventHeader> getEvents(UUID userId){
        Optional<UserEntity> user = userRepository.getUserById(userId);
        List<UserEntity> groupMembers = userRepository.getGroupUsers(user.get().getGroup_id());
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
        if (groupMembers.size() < 2){
           return eventRepository.getEventsByUserId(userId)
                   .stream().map(EventEntity -> EventHeader.builder()
                           .id(EventEntity.getEvent_id())
                           .name(EventEntity.getEvent_name())
                           .from(formatter.format(EventEntity.getTime_from()))
                            .date(EventEntity.getDate())
                           .build()).toList();
        }
        return eventRepository.getGroupEvents(user.get().getGroup_id()).stream()
                .map(EventEntity -> EventHeader.builder()
                        .id(EventEntity.getEvent_id())
                        .name(EventEntity.getEvent_name())
                        .from(formatter.format(EventEntity.getTime_from()))
                        .date(EventEntity.getDate())
                        .build()).toList();
    }

    public EventDetails getEventDetails(UUID eventId){
        EventEntity eventEntity = eventRepository.getEventDetails(eventId);
        return EventDetails.builder()
                .name(eventEntity.getEvent_name())
                .description(eventEntity.getEvent_description())
                .date(eventEntity.getDate())
                .from(eventEntity.getTime_from())
                .to(eventEntity.getTime_to())
                .attendees(eventEntity.getAttendees())
                .build();
    }
}
