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
    private UUID id;
    private UUID user_id;
    private String name;
    private String description;
    private Date date;
    private Time from;
    private Time to;
    private String attendees;

}
