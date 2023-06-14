package com.wileyedge.sturegws.service;

import java.util.List;
import java.util.Map;

import com.wileyedge.sturegws.model.Student;

public interface IService {
	public Student save(Student student);
	public Student updateStudent(Student student);
	public Student retrieveStudentById(int id);
	public List<Student> retrieveAllStudents();
	public Student deleteById(int id);
	public List<Student> searchStudents(Map<String, String> searchCriteria);
}
