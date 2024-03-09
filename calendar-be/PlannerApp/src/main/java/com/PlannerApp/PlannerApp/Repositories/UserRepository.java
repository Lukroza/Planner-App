package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.UserEntity;
import com.PlannerApp.PlannerApp.Models.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
@Mapper
public interface UserRepository {

    @Insert("INSERT INTO users (id, username) " +
            "VALUES (#{user.id}, #{user.username})")
    void insertUser(@Param("user") UserEntity user);

    @Select("SELECT id, username FROM users WHERE group_id = #{groupID}")
    List<UserEntity> getGroupUsers(@Param("groupID") UUID groupId);
}
