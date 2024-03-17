package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.InviteEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
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
}