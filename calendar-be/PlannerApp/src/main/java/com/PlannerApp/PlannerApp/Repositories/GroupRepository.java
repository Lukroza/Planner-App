package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.GroupEntity;
import com.PlannerApp.PlannerApp.Entities.UserEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@Mapper
public interface GroupRepository {

    @Insert("INSERT INTO groups (id, name, owner_id) VALUES (#{group.id}, #{group.name}, #{group.owner_id})")
    void insertGroup(@Param("group") GroupEntity group);

    @Select("SELECT * FROM groups WHERE id = #{id}")
    Optional<GroupEntity> getGroupName(@Param("id") UUID id);


    @Delete("DELETE FROM groups WHERE id = #{groupId}")
    void deleteGroup(@Param("groupId") UUID groupId);

    @Delete("DELETE FROM invites WHERE group_id = #{groupId}")
    void deleteInvitesByGroupId(@Param("groupId") UUID groupId);

    @Update("UPDATE users SET group_id = NULL WHERE group_id = #{groupId}")
    void removeGroupFromUsers(@Param("groupId") UUID groupId);

}
