package com.PlannerApp.PlannerApp.Repositories;

import com.PlannerApp.PlannerApp.Entities.GroupEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface GroupRepository {

    @Insert("INSERT INTO groups (id, name, owner_id) VALUES (#{group.id}, #{group.name}, #{group.owner_id})")
    void insertGroup(@Param("group") GroupEntity group);
}
