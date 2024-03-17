package com.PlannerApp.PlannerApp.Services;

import com.PlannerApp.PlannerApp.Models.Invite;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.PlannerApp.PlannerApp.Repositories.InviteRepository;
import java.util.UUID;
import com.PlannerApp.PlannerApp.Entities.InviteEntity;

@Service
@RequiredArgsConstructor
@Slf4j
public class InviteService {
    private final InviteRepository inviteRepository;

    public UUID insertInvite(Invite invite) {
        UUID invite_id = UUID.randomUUID();
        InviteEntity inviteEntity = InviteEntity.builder()
                .id(invite_id)
                .user_id(invite.getUser_id())
                .group_id(invite.getGroup_id())
                .build();

        inviteRepository.insertInvite(inviteEntity);
        return invite_id;
    }
}
