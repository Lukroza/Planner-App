package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.EventEntity;
import com.PlannerApp.PlannerApp.Models.Event;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.*;
import java.sql.Date;

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

    @Select("SELECT COUNT(*) FROM event WHERE user_id = #{userId} AND DATE(date) = DATE(#{date})")
    int countEventsByUserIdAndDate(@Param("userId") UUID userId, @Param("date") Date date);

}

