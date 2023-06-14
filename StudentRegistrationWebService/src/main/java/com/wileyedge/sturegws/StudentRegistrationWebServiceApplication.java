package com.wileyedge.sturegws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.wileyedge.sturegws")
public class StudentRegistrationWebServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentRegistrationWebServiceApplication.class, args);
		
		
	}

}
