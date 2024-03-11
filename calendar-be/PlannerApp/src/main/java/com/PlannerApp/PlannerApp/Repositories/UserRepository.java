package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.UserEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
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
}
