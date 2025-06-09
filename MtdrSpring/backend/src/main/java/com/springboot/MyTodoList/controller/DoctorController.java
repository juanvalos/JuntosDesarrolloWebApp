package com.springboot.MyTodoList.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.MyTodoList.dto.DoctorSummaryDTO;
import com.springboot.MyTodoList.model.Doctor;
import com.springboot.MyTodoList.service.DoctorService;

@RestController
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping(value = "/doctor")
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor) {
        Doctor createdDoctor = doctorService.createDoctor(doctor);
        return ResponseEntity.ok(createdDoctor);
    }

    @GetMapping(value = "/doctor/{id}")
    public ResponseEntity<Doctor> getUserById(@PathVariable int id) {
        Doctor doctor = doctorService.getUserById(id);
        if (doctor != null) {
            return ResponseEntity.ok(doctor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/doctor/summary")
    public ResponseEntity<List<DoctorSummaryDTO>> getAllUserSummaries() {
        List<DoctorSummaryDTO> summaries = doctorService.getAllUserSummaries();
        return ResponseEntity.ok(summaries);
    }
} 