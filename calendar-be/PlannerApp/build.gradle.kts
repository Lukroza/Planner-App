plugins {
	java
	id("org.springframework.boot") version "3.2.2"
	id("io.spring.dependency-management") version "1.1.4"
}

group = "com.PlannerApp"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	runtimeOnly("org.postgresql:postgresql")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	implementation ("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation ("org.postgresql:postgresql")

	implementation("org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.3")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.mybatis.spring.boot:mybatis-spring-boot-starter-test:3.0.3")

	annotationProcessor("org.projectlombok:lombok")
	compileOnly("org.projectlombok:lombok")

}

tasks.withType<Test> {
	useJUnitPlatform()
}
