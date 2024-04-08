package com.PlannerApp.PlannerApp.Entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventAttendeeEntity {
    private UUID event_id;
    private UUID user_id;
}
