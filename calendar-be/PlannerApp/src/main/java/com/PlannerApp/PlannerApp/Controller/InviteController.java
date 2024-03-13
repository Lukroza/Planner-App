// Update InviteController to extract data from Invite model and pass to service
package com.PlannerApp.PlannerApp.Controller;

import com.PlannerApp.PlannerApp.Models.Invite;
import com.PlannerApp.PlannerApp.Services.InviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/invite")
public class InviteController {

    private final InviteService inviteService;

    @Autowired
    public InviteController(InviteService inviteService) {
        this.inviteService = inviteService;
    }

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID insertInvite(@RequestBody Invite invite) {
        return inviteService.insertInvite(invite.getUser_id(), invite.getGroup_id());
    }
}
