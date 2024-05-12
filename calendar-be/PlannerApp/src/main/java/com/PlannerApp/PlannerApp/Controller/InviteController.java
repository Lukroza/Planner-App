package com.PlannerApp.PlannerApp.Controller;

import com.PlannerApp.PlannerApp.Models.Invite;
import com.PlannerApp.PlannerApp.Models.User;
import com.PlannerApp.PlannerApp.Services.InviteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> insertInvite(@RequestBody Invite invite){
        UUID inviteId = inviteService.insertInvite(invite);
        if (inviteId == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(inviteId, HttpStatus.CREATED);
        }
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
