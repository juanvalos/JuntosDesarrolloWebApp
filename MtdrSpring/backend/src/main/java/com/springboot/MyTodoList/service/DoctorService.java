package com.springboot.MyTodoList.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.MyTodoList.dto.DoctorSummaryDTO;
import com.springboot.MyTodoList.model.Doctor;
import com.springboot.MyTodoList.repository.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor getUserById(int id) {
        return doctorRepository.findById(id).orElse(null);
    }


    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<DoctorSummaryDTO> getAllUserSummaries() {
    return doctorRepository.findAll()
        .stream()
        .map(u -> new DoctorSummaryDTO(u.getId(), u.getName()))
        .collect(Collectors.toList());
    }
}