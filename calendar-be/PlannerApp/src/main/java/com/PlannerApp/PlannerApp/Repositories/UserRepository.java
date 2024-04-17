package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.UserEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
@Mapper
public interface UserRepository {

    @Update("UPDATE users SET group_id = #{groupID} WHERE id = #{userID}")
    void updateUserGroup(@Param("groupID") UUID groupID, @Param("userID") UUID userID);

    @Insert("INSERT INTO users (id, username) " +
            "VALUES (#{user.id}, #{user.username})")
    void insertUser(@Param("user") UserEntity user);

    @Select("SELECT id, username FROM users WHERE group_id = #{groupID}")
    List<UserEntity> getGroupUsers(@Param("groupID") UUID groupId);
    @Select("SELECT * FROM users WHERE username = #{username}")
    Optional<UserEntity> getUserByUsername(@Param("username") String username);

    @Update("UPDATE users SET group_id = #{groupID} WHERE id = #{userID}")
    void addUserToGroup(@Param("groupID") UUID groupID, @Param("userID") UUID userID);

    @Select("SELECT * FROM users WHERE id = #{id}")
    Optional<UserEntity> getUserById(@Param("id") UUID id);

    @Update("UPDATE users SET group_id = NULL WHERE id = #{userId}")
    void removeUserFromGroup(@Param("userId") UUID userId);

    @Update("UPDATE users SET group_id = NULL WHERE group_id = #{groupId}")
    void removeGroupFromUsers(@Param("groupId") UUID groupId);
}
