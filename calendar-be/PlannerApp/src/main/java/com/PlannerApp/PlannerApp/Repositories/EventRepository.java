package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.EventAttendeeEntity;
import com.PlannerApp.PlannerApp.Entities.EventEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.*;
import java.sql.Date;

import java.util.List;
import java.util.UUID;

@Repository
@Mapper
public interface EventRepository {

    @Insert("INSERT INTO event (event_id, user_id, event_name, date, time_from, time_to, event_description, attendees) " +
            "VALUES (#{event.event_id}, #{event.user_id}, #{event.event_name}, #{event.date}, #{event.time_from}, #{event.time_to}, #{event.event_description}, #{event.attendees})")
    void insertEvent(@Param("event") EventEntity event);

    @Delete("DELETE FROM event WHERE event_id = #{eventId} AND user_id = #{userId}")
    void deleteEvent(@Param("eventId") UUID eventId, @Param("userId") UUID userId);

    @Select("SELECT * FROM event WHERE user_id IN (SELECT id FROM users WHERE group_id = #{groupID})")
    List<EventEntity> getGroupEvents(@Param("groupID") UUID groupID);

    @Select("SELECT * FROM event WHERE user_id = #{userId}")
    List<EventEntity> getEventsByUserId(@Param("userId") UUID userId);

    @Select("SELECT * FROM event WHERE event_id = #{eventId}")
    EventEntity getEventDetails(UUID eventId);

    @Select("SELECT users.username FROM event_attendees JOIN users ON event_attendees.user_id = users.id WHERE event_id = #{eventId}")
    List<String> getAttendees(@Param("eventId") UUID eventId);

    @Insert("INSERT INTO event_attendees (event_id, user_id) VALUES (#{attendee.event_id}, #{attendee.user_id})")
    void joinEvent(@Param("attendee") EventAttendeeEntity attendee);

    @Delete("DELETE FROM event_attendees WHERE event_id = #{attendee.event_id} AND user_id = #{attendee.user_id}")
    int leaveEvent(@Param("attendee") EventAttendeeEntity attendee);

    @DeleteProvider(type = SqlProvider.class, method = "deleteEventsByUserIds")
    void deleteEventsByUserIds(@Param("userIds") List<UUID> userIds);
}

