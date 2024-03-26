package com.PlannerApp.PlannerApp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.PlannerApp.PlannerApp.Repositories.EventRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.PlannerApp.PlannerApp.Services.EventService;

import java.sql.Date;
import java.util.Calendar;

import static org.junit.jupiter.api.Assertions.assertThrows;
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
	public void whenCountEventsByDate_thenReturnCorrectCount() {
		Date testDate = new Date(System.currentTimeMillis());
		Long expectedCount = 5L;

		when(eventRepository.countByDate(testDate)).thenReturn(expectedCount);

		Long actualCount = eventService.countEventsByDate(testDate);

		assertEquals(expectedCount, actualCount, "The count of events should be equal to the expected count");
	}
	@Test
	public void countEventsByDate_NoEvents_ShouldReturnZero() {

		Date testDate = new Date(Calendar.getInstance().getTimeInMillis());
		long expectedCount = 0L;
		when(eventRepository.countByDate(testDate)).thenReturn(expectedCount);

		long actualCount = eventService.countEventsByDate(testDate);

		assertEquals(expectedCount, actualCount, "The actual count should be zero when there are no events.");
	}
	@Test
	public void countEventsByDate_RepositoryThrowsException_ShouldPropagateException() {

		Date testDate = new Date(Calendar.getInstance().getTimeInMillis());
		when(eventRepository.countByDate(testDate)).thenThrow(new RuntimeException("Database error"));

		assertThrows(RuntimeException.class, () -> eventService.countEventsByDate(testDate), "Should throw the same exception as the repository");
	}
	@Test
	public void countEventsByDate_EventsOnLeapDay_ShouldReturnCorrectCount() {

		Calendar calendar = Calendar.getInstance();
		calendar.set(2024, Calendar.FEBRUARY, 29);
		Date leapDay = new Date(calendar.getTimeInMillis());
		long expectedCount = 2L;
		when(eventRepository.countByDate(leapDay)).thenReturn(expectedCount);

		long actualCount = eventService.countEventsByDate(leapDay);

		assertEquals(expectedCount, actualCount, "The actual count should match expected events on a leap day.");
	}
	@Test
	public void countEventsByDate_EventsInFuture_ShouldReturnCorrectCount() {

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.YEAR, 1);
		Date futureDate = new Date(calendar.getTimeInMillis());
		long expectedCount = 3L;
		when(eventRepository.countByDate(futureDate)).thenReturn(expectedCount);

		long actualCount = eventService.countEventsByDate(futureDate);

		assertEquals(expectedCount, actualCount, "The actual count should match expected events on a future date.");
	}
}
