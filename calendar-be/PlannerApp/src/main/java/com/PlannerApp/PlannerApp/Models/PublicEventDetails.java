package com.PlannerApp.PlannerApp.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PublicEventDetails {
    private String name;
    private Date date;
    private Time from;
    private Time to;
    private String description;
    private int attendees;
}
