package com.PlannerApp.PlannerApp.Services;

import com.PlannerApp.PlannerApp.Models.Group;
import com.PlannerApp.PlannerApp.Models.Invite;
import com.PlannerApp.PlannerApp.Models.User;
import com.PlannerApp.PlannerApp.Repositories.GroupRepository;
import com.PlannerApp.PlannerApp.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.PlannerApp.PlannerApp.Entities.GroupEntity;
import com.PlannerApp.PlannerApp.Repositories.EventRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public UUID insertGroup(Group group){
        UUID groupId = UUID.randomUUID();
        groupRepository.insertGroup(
                GroupEntity.builder()
                        .id(groupId)
                        .name(group.getName())
                        .owner_id(group.getOwner_id())
                        .build()
        );
        userRepository.updateUserGroup(groupId, group.getOwner_id());
        return groupId;
    }

    public Optional<Group> getGroupName(UUID groupId) {
        return groupRepository.getGroupName(groupId)
                .map(groupEntity -> Group.builder()
                        .id(groupEntity.getId())
                        .name(groupEntity.getName())
                        .owner_id(groupEntity.getOwner_id())
                        .build());
    }

    public void removeUserFromGroup(UUID userId) {
        userRepository.removeUserFromGroup(userId);
    }

    private void removeGroupAssociationsFromInvites(UUID groupId) {
        groupRepository.deleteInvitesByGroupId(groupId);
    }

    private void removeGroupAssociationsFromUsers(UUID groupId) {
        userRepository.removeGroupFromUsers(groupId);
    }

    public void deleteGroup(UUID groupId) {
        List<UUID> userIds = userRepository.getUserIdsByGroupId(groupId);
        eventRepository.deleteEventsByUserIds(userIds);

        removeGroupAssociationsFromInvites(groupId);
        removeGroupAssociationsFromUsers(groupId);

        groupRepository.deleteGroup(groupId);
    }
}
