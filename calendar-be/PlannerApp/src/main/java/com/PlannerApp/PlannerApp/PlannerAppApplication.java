package com.PlannerApp.PlannerApp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan("com.PlannerApp.PlannerApp.Repositories")
public class PlannerAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlannerAppApplication.class, args);
	}

}
