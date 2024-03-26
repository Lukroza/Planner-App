package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.EventEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.*;
import java.sql.Date;

@Repository
@Mapper
public interface EventRepository {

    @Insert("INSERT INTO event (event_id, user_id, event_name, date, time_from, time_to, event_description, attendees) " +
            "VALUES (#{event.id}, #{event.user_id}, #{event.name}, #{event.date}, #{event.from}, #{event.to}, #{event.description}, #{event.attendees})")
    void insertEvent(@Param("event") EventEntity event);
    @Select("SELECT COUNT(*) FROM event WHERE date = #{date}")
    Long countByDate(@Param("date") Date date);
}

