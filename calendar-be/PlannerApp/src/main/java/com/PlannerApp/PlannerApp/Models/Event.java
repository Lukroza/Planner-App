package com.PlannerApp.PlannerApp.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Event {
    private UUID id;
    private UUID userId;
    private String name;
    private Date date;
    private Time from;
    private Time to;
    private String description;
    private String attendees;
    private Boolean isPublic;
}
