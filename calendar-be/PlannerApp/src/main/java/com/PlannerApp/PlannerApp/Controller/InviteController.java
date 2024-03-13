package com.PlannerApp.PlannerApp.Controller;

import com.PlannerApp.PlannerApp.Models.Invite;
import com.PlannerApp.PlannerApp.Services.InviteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/invite")
@RequiredArgsConstructor
@Slf4j
public class InviteController {
    private final InviteService inviteService;

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID insertGroup(@RequestBody Invite invite){
        return inviteService.insertInvite(invite);
    }
}
