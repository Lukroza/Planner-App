package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.UserEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserRepository {

    @Insert("INSERT INTO user (user_id, username) " +
            "VALUES (#{user.user_id}, #{user.username})")
    void registerUser(@Param("user") UserEntity user);
}
