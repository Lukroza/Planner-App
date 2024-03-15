package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.InviteEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InviteRepository {
    @Insert("INSERT INTO invites (id, user_id, group_id) " +
            "VALUES (#{invite.id}, #{invite.user_id}, #{invite.group_id})")
    void sendInvite(@Param("invite") InviteEntity invite);
}