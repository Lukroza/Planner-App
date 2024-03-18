package com.PlannerApp.PlannerApp.Controller;

import com.PlannerApp.PlannerApp.Models.Invite;
import com.PlannerApp.PlannerApp.Models.User;
import com.PlannerApp.PlannerApp.Services.InviteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/invite")
@RequiredArgsConstructor
@Slf4j
public class InviteController {
    private final InviteService inviteService;

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID insertInvite(@RequestBody Invite invite){
        return inviteService.insertInvite(invite);
    }

    @GetMapping("/get/{userId}")
    public List<Invite> getUserInvites(@PathVariable UUID userId){ return inviteService.getUserInvites(userId);}

    @DeleteMapping("/accept/{inviteId}")
    public UUID acceptInvite(@PathVariable UUID inviteId){
        return inviteService.acceptInvite(inviteId);
    }

    @DeleteMapping("/decline/{inviteId}")
    public void declineInvite(@PathVariable UUID inviteId){
        inviteService.declineInvite(inviteId);
    }
}
