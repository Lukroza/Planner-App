package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.InviteEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@Mapper
public interface InviteRepository {
    @Insert("INSERT INTO invites (id, user_id, group_id) " +
            "VALUES (#{invite.id}, #{invite.user_id}, #{invite.group_id})")
    void insertInvite(@Param("invite") InviteEntity invite);

    @Select("SELECT id, user_id, group_id FROM invites WHERE user_id = #{userId}")
    List<InviteEntity> getUserInvites(@Param("userId") UUID userId);

    @Select("SELECT id, user_id, group_id FROM invites WHERE id = #{inviteId}")
    InviteEntity getInviteById(@Param("inviteId") UUID inviteId);

    @Delete("DELETE FROM invites WHERE id = #{inviteId}")
    void deleteInvite(@Param("inviteId") UUID inviteId);

    @Delete("DELETE FROM invites WHERE user_id = #{userId}")
    void deleteAllInvites(@Param("userId") UUID userId);
}