package com.PlannerApp.PlannerApp.Entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventEntity {
    private UUID event_id;
    private UUID user_id;
    private String event_name;
    private String event_description;
    private Date date;
    private Time time_from;
    private Time time_to;
    private String attendees;

}
