package com.PlannerApp.PlannerApp;

import com.PlannerApp.PlannerApp.Entities.EventEntity;
import com.PlannerApp.PlannerApp.Entities.GroupEntity;
import com.PlannerApp.PlannerApp.Entities.UserEntity;
import com.PlannerApp.PlannerApp.Models.Group;
import com.PlannerApp.PlannerApp.Repositories.GroupRepository;
import com.PlannerApp.PlannerApp.Repositories.UserRepository;
import com.PlannerApp.PlannerApp.Services.GroupService;
import com.PlannerApp.PlannerApp.Services.SqlProvider;
import com.PlannerApp.PlannerApp.Services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.PlannerApp.PlannerApp.Repositories.EventRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.PlannerApp.PlannerApp.Services.EventService;

import java.sql.Date;
import java.sql.Time;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class PlannerAppApplicationTests {

	@Test
	void contextLoads() {
	}

}
@ExtendWith(MockitoExtension.class)
class EventServiceTests {

	@Mock
	private EventRepository eventRepository;

	@InjectMocks
	private EventService eventService;

	@Test
	public void whenCountGroupEventsInMonth_thenReturnCorrectCount() {
		UUID groupId = UUID.randomUUID();
		Calendar calendar = Calendar.getInstance();
		calendar.set(2024, Calendar.FEBRUARY, 15);
		Date testDate = new Date(calendar.getTimeInMillis());
		Time startTime = Time.valueOf("10:00:00");
		Time endTime = Time.valueOf("12:00:00");

		List<EventEntity> mockEvents = new ArrayList<>(Arrays.asList(
				new EventEntity(UUID.randomUUID(), groupId, "Event 1", "Location 1", testDate, startTime, endTime, "Description 1"),
				new EventEntity(UUID.randomUUID(), groupId, "Event 2", "Location 2", testDate, startTime, endTime, "Description 2")
		));

		calendar.set(2024, Calendar.MARCH, 1);
		Date marchDate = new Date(calendar.getTimeInMillis());
		mockEvents.add(new EventEntity(UUID.randomUUID(), groupId, "Event 3", "Location 3", marchDate, startTime, endTime, "Description 3"));

		when(eventRepository.getGroupEvents(groupId)).thenReturn(mockEvents);

		long actualCount = eventService.countGroupEventsInMonth(groupId, testDate);

		long expectedCount = 2L;
		assertEquals(expectedCount, actualCount, "The count should match the number of events in February.");
	}
}

@ExtendWith(MockitoExtension.class)
class GroupServiceTest {

	@Mock
	private GroupRepository groupRepository;

	@Mock
	private EventRepository eventRepository;

	@InjectMocks
	private GroupService groupService;

	@Test
	public void groupWithMostEvents_WhenOneGroupHasMost_ReturnsThatGroup() {
		UUID groupId1 = UUID.randomUUID();
		UUID groupId2 = UUID.randomUUID();
		GroupEntity group1 = new GroupEntity(groupId1, "Group1", UUID.randomUUID());
		GroupEntity group2 = new GroupEntity(groupId2, "Group2", UUID.randomUUID());
		List<GroupEntity> allGroups = Arrays.asList(group1, group2);

		when(groupRepository.findAllGroups()).thenReturn(allGroups);
		when(eventRepository.getGroupEvents(groupId1)).thenReturn(Collections.nCopies(5, new EventEntity()));
		when(eventRepository.getGroupEvents(groupId2)).thenReturn(Collections.nCopies(10, new EventEntity()));

		Group result = groupService.groupWithMostEvents();

		assertEquals(groupId2, result.getId());
		assertEquals("Group2", result.getName());
		verify(groupRepository).findAllGroups();
		verify(eventRepository).getGroupEvents(groupId1);
		verify(eventRepository).getGroupEvents(groupId2);
	}

	@Test
	public void groupWithMostEvents_WhenNoGroupsAvailable_ThrowsException() {
		when(groupRepository.findAllGroups()).thenReturn(Collections.emptyList());

		assertThrows(IllegalStateException.class, () -> groupService.groupWithMostEvents());
	}

	@Test
	public void groupWithMostEvents_WhenGroupsHaveSameEventCount_ReturnsFirst() {
		UUID groupId1 = UUID.randomUUID();
		UUID groupId2 = UUID.randomUUID();
		GroupEntity group1 = new GroupEntity(groupId1, "Group1", UUID.randomUUID());
		GroupEntity group2 = new GroupEntity(groupId2, "Group2", UUID.randomUUID());
		List<GroupEntity> allGroups = Arrays.asList(group1, group2);

		when(groupRepository.findAllGroups()).thenReturn(allGroups);
		when(eventRepository.getGroupEvents(groupId1)).thenReturn(Collections.nCopies(10, new EventEntity()));
		when(eventRepository.getGroupEvents(groupId2)).thenReturn(Collections.nCopies(10, new EventEntity()));

		Group result = groupService.groupWithMostEvents();

		assertEquals(groupId1, result.getId());
		assertEquals("Group1", result.getName());
	}
}

@ExtendWith(MockitoExtension.class)
class SqlProviderTests {
	@Test
	public void whenDeleteEventsByUserIdsIsCalled_thenReturnsCorrectSql() {
		List<UUID> userIds = Arrays.asList(UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID());
		HashMap<String, Object> params = new HashMap<>();
		params.put("userIds", userIds);
		String expectedSql = "DELETE FROM event WHERE user_id IN (" +
				"#{userIds[0]}," +
				"#{userIds[1]}," +
				"#{userIds[2]})";

		String actualSql = SqlProvider.deleteEventsByUserIds(params);

		assertEquals(expectedSql, actualSql, "Sql statement should match the expected sql");
	}

	@Test
	public void whenDeleteEventsByUserIdsWithEmptyList_thenReturnsCorrectSqlWithoutIds() {
		List<UUID> userIds = Arrays.asList();
		HashMap<String, Object> params = new HashMap<>();
		params.put("userIds", userIds);
		String expectedSql = "DELETE FROM event WHERE user_id IN ()";

		String actualSql = SqlProvider.deleteEventsByUserIds(params);
		assertEquals(expectedSql, actualSql, "Sql should not contain any ID's if the list is empty");
	}
}

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

	@Mock
	private UserRepository userRepository;

	@InjectMocks
	private UserService userService;

	@Test
	public void testCountUsersWithSimilarName() {
		String baseName = "Lukas";
		List<UserEntity> mockedUsers = Arrays.asList(
				UserEntity.builder().username("Lukas").build(),
				UserEntity.builder().username("Lukas2").build(),
				UserEntity.builder().username("Lukas3").build(),
				UserEntity.builder().username("Lukasnaujas").build(),
				UserEntity.builder().username("lukasismazosios").build()
		);

		when(userRepository.findUsersByUsernamePattern(baseName + "%")).thenReturn(mockedUsers);

		int result = userService.countUsersWithSimilarName(baseName);

		assertEquals(5, result);
		verify(userRepository).findUsersByUsernamePattern(baseName + "%");
	}

	@Test
	public void testCountUsersWithNoMatches() {
		String baseName = "TestName";

		when(userRepository.findUsersByUsernamePattern(baseName + "%")).thenReturn(Arrays.asList());

		int result = userService.countUsersWithSimilarName(baseName);

		assertEquals(0, result);
		verify(userRepository).findUsersByUsernamePattern(baseName + "%");
	}
}