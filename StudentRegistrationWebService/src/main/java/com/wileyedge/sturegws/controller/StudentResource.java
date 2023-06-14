package com.wileyedge.sturegws.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wileyedge.sturegws.exceptions.InvalidStudentDataException;
import com.wileyedge.sturegws.exceptions.StudentNotFoundException;
import com.wileyedge.sturegws.model.Student;
import com.wileyedge.sturegws.service.IService;

@RestController
@CrossOrigin(origins = "*")
public class StudentResource {
	
	@Autowired
	private IService service;
	
	@GetMapping(value = "/students/{id}")
	public Student fetchStudent(@PathVariable int id) {
		System.out.println("Inside fetchStudent of StudentResource");
		Student student = service.retrieveStudentById(id);
		
		if(student == null) {
			throw new StudentNotFoundException("No student with id: " + id + " not found!");
		}
		
		return student;
	}
	
	@GetMapping(value = "/students")
	public List<Student> retrieveAllStudents(){
		System.out.println("Inside retrieveAllStudents of StudentResource");
		List<Student> students = service.retrieveAllStudents();
		
		return students;
	}
	
	@PostMapping(path = "/students")
	public void createStudent(@Valid @RequestBody Student student) {
		System.out.println("Inside createStudent of StudentResource");
		System.out.println(student);
		
		if(student.getName().isEmpty()) {
			throw new InvalidStudentDataException("Student name must not be blank!");
		}else if(student.getAge() <= 0) {
			throw new InvalidStudentDataException("Student age must greater than 0!");
		}else if(student.getMobile().isEmpty()){
			throw new InvalidStudentDataException("Contact mobile must not be blank!");
		}else if(student.getAddress().isEmpty()) {
			throw new InvalidStudentDataException("Student address must not be blank!");
		}
		
		service.save(student);
	}
	
	@DeleteMapping(path = "/students/{id}")
	public ResponseEntity<Void> deleteStudent(@PathVariable int id) { 
	    System.out.println("Inside deleteStudent of StudentResource");
	    Student student = service.deleteById(id);
	    
	    if(student == null) {
	        throw new StudentNotFoundException("No student with id: " + id + " found to delete!");
	    }

	    return ResponseEntity.noContent().build();
	}
	
	@PutMapping(path = "/students/{id}")
	public ResponseEntity<Student> updateStudent(@Valid @RequestBody Student student, @PathVariable int id) {
	    System.out.println("Inside updateStudent of StudentResource");

	    service.updateStudent(student);

	    return new ResponseEntity<Student>(student, HttpStatus.OK);
	}
	
	@PostMapping(path = "/students/search")
	public List<Student> searchStudents(@RequestBody Map<String, String> searchCriteria) {
	    System.out.println("Inside searchStudents of StudentResource");
	    
	    List<Student> students = service.searchStudents(searchCriteria);

	    if(students.isEmpty()) {
	        throw new StudentNotFoundException("No students matching the search criteria found!");
	    }

	    System.out.println(searchCriteria);
	    return students;
	}
}


