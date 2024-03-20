package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.GroupEntity;
import com.PlannerApp.PlannerApp.Entities.UserEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
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
}
