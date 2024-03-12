package com.PlannerApp.PlannerApp.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class User {
    private UUID id;
    private String username;
    private UUID group_id;
}
