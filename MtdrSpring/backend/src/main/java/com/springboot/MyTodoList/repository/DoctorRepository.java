package com.springboot.MyTodoList.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.MyTodoList.model.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Doctor getUserById(int id);
}