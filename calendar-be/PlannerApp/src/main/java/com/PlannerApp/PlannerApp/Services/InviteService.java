// Annotate InviteService with @Service
package com.PlannerApp.PlannerApp.Services;

import org.springframework.stereotype.Service;
import com.PlannerApp.PlannerApp.Repositories.InviteRepository;
import java.util.UUID;
import com.PlannerApp.PlannerApp.Entities.InviteEntity;

@Service
public class InviteService {
    private final InviteRepository inviteRepository;

    public InviteService(InviteRepository inviteRepository){
        this.inviteRepository = inviteRepository;
    }

    public UUID insertInvite(UUID userId, UUID groupId) {
        UUID inviteId = UUID.randomUUID();
        InviteEntity inviteEntity = InviteEntity.builder()
                .id(inviteId)
                .user_id(userId)
                .group_id(groupId)
                .build();

        inviteRepository.insertInvite(inviteEntity);
        return inviteId;
    }
}
