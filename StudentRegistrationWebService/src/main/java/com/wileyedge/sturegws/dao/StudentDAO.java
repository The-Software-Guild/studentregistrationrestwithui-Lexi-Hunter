package com.wileyedge.sturegws.dao;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wileyedge.sturegws.model.Student;

public interface StudentDAO extends JpaRepository<Student, Integer>{

}
