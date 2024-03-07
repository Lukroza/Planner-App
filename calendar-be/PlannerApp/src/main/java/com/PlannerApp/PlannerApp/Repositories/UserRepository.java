package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.UserEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserRepository {

    @Insert("INSERT INTO users (id, username) " +
            "VALUES (#{user.id}, #{user.username})")
    void insertUser(@Param("user") UserEntity user);
}
