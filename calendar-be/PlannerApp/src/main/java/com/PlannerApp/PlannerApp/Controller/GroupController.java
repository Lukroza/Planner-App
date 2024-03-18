package com.PlannerApp.PlannerApp.Controller;

import com.PlannerApp.PlannerApp.Models.Group;
import com.PlannerApp.PlannerApp.Models.User;
import com.PlannerApp.PlannerApp.Services.GroupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/group")
@RequiredArgsConstructor
@Slf4j
public class GroupController {

    private final GroupService groupService;

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID insertGroup(@RequestBody Group group){
        return groupService.insertGroup(group);
    }

    @GetMapping("/get/name/{groupId}")
    public Optional<Group> getGroupName(@PathVariable UUID groupId) {
        return groupService.getGroupName(groupId);
    }
}
