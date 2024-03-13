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
public class InviteEntity {
    private UUID id;
    private UUID user_id;
    private UUID group_id;
}
