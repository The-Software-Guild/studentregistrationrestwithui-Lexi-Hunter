package com.wileyedge.sturegws.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.wileyedge.sturegws.dao.StudentDAO;
import com.wileyedge.sturegws.model.Student;

@Service
public class StudentService implements IService {

	@Autowired
	@Qualifier(value = "jparepos")
	private StudentDAO dao;
	
	@Override
	public Student save(Student student) {
		System.out.println("Inside save of StudentService");
		Student s = dao.save(student);
		return s;
	}

	@Override
	public Student retrieveStudentById(int id) {
		System.out.println("Inside retrieveStudentById of StudentService");
		Optional<Student> opt = dao.findById(id);
		
		Student student = null;
		if(opt.isPresent()) {
			student = opt.get();
		}
		return student;
	}

	@Override
	public List<Student> retrieveAllStudents() {
		System.out.println("Inside retrieveAllStudents of StudentService");
		List<Student> students = dao.findAll();
		return students;
	}

	@Override
	public Student deleteById(int id) {
	    System.out.println("Inside deleteById of StudentService");
	    Optional<Student> opt = dao.findById(id);
	    if(opt.isPresent()) {
	        Student student = opt.get();
	        dao.deleteById(id);
	        return student;
	    } else {
	        return null;
	    }
	}

	@Override
	public Student updateStudent(Student student) {
		System.out.println("Inside updateStudent of StudentService");
		dao.save(student);
		return null;
	}
	
	@Override
	public List<Student> searchStudents(Map<String, String> searchCriteria) {
		
		List<Student> students = dao.findAll();
		
		List<Student> filteredStudents = new ArrayList<Student>(students);
		
		if(searchCriteria.containsKey("idComparison")) {
			int idValue = Integer.parseInt(searchCriteria.get("id"));
			if(searchCriteria.get("idComparison").equals("greaterThan")) {
				filteredStudents = filteredStudents.stream().filter(s -> s.getId() > idValue).collect(Collectors.toList());
			}else if(searchCriteria.get("idComparison").equals("lessThan")) {
				filteredStudents = filteredStudents.stream().filter(s -> s.getId() < idValue).collect(Collectors.toList());
			}else if(searchCriteria.get("idComparison").equals("equalTo")) {
				filteredStudents = filteredStudents.stream().filter(s -> s.getId() == idValue).collect(Collectors.toList());
			}
		}
		if(searchCriteria.containsKey("name")) {
			String nameValue = searchCriteria.get("name");
			filteredStudents = filteredStudents.stream().filter(s -> s.getName().equals(nameValue)).collect(Collectors.toList());
		}
		if(searchCriteria.containsKey("ageComparison")) {
			int ageValue = Integer.parseInt(searchCriteria.get("age"));
			if(searchCriteria.get("ageComparison").equals("greaterThan")) {
				filteredStudents = filteredStudents.stream().filter(s -> s.getAge() > ageValue).collect(Collectors.toList());
			}else if(searchCriteria.get("ageComparison").equals("lessThan")) {
				filteredStudents = filteredStudents.stream().filter(s -> s.getAge() < ageValue).collect(Collectors.toList());
			}else if(searchCriteria.get("ageComparison").equals("equalTo")) {
				filteredStudents = filteredStudents.stream().filter(s -> s.getAge() == ageValue).collect(Collectors.toList());
			}
		}
		
		if(searchCriteria.containsKey("mobile")) {
			String mobileValue = searchCriteria.get("mobile");
			filteredStudents = filteredStudents.stream().filter(s -> s.getMobile().equals(mobileValue)).collect(Collectors.toList());
		}
		
		if(searchCriteria.containsKey("address")) {
			String addressValue = searchCriteria.get("address");
			filteredStudents = filteredStudents.stream().filter(s -> s.getAddress().equals(addressValue)).collect(Collectors.toList());
		}
		
		for(Student s : filteredStudents) {
			System.out.println(s);
		}
		return filteredStudents;
	}

}
