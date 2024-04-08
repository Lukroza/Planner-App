package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.EventAttendeeEntity;
import com.PlannerApp.PlannerApp.Entities.EventEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.UUID;

@Repository
@Mapper
public interface EventRepository {

    @Insert("INSERT INTO event (event_id, user_id, event_name, date, time_from, time_to, event_description, attendees) " +
            "VALUES (#{event.id}, #{event.user_id}, #{event.name}, #{event.date}, #{event.from}, #{event.to}, #{event.description}, #{event.attendees})")
    void insertEvent(@Param("event") EventEntity event);

    @Select("SELECT * FROM event WHERE user_id IN (SELECT id FROM users WHERE group_id = #{groupID})")
    List<EventEntity> getGroupEvents(@Param("groupID") UUID groupID);

    @Select("SELECT * FROM event WHERE user_id = #{userId}")
    List<EventEntity> getEventsByUserId(@Param("userId") UUID userId);

    @Select("SELECT * FROM event WHERE event_id = #{eventId}")
    EventEntity getEventDetails(UUID eventId);

    @Insert("INSERT INTO event_attendees (event_id, user_id) VALUES (#{attendee.event_id}, #{attendee.user_id})")
    void joinEvent(@Param("attendee") EventAttendeeEntity attendee);
}
