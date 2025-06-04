package com.springboot.MyTodoList.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.MyTodoList.dto.UserChildSummaryDTO;
import com.springboot.MyTodoList.model.UserChild;
import com.springboot.MyTodoList.service.UserChildService;

@RestController
public class UserChildController {

    @Autowired
    private UserChildService userChildService;

    @PostMapping(value = "/userchild")
    public ResponseEntity<UserChild> createUserChild(@RequestBody UserChild userChild) {
        UserChild createdUserChild = userChildService.createUserChild(userChild);
        return ResponseEntity.ok(createdUserChild);
    }

    @GetMapping(value = "/userchild/{id}")
    public ResponseEntity<UserChild> getUserById(@PathVariable int id) {
        UserChild userChild = userChildService.getUserById(id);
        if (userChild != null) {
            return ResponseEntity.ok(userChild);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/userchildren")
    public ResponseEntity<List<UserChild>> getAllUsers() {
        List<UserChild> users = userChildService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/userchildren/summary")
    public ResponseEntity<List<UserChildSummaryDTO>> getAllUserSummaries() {
        List<UserChildSummaryDTO> summaries = userChildService.getAllUserSummaries();
        return ResponseEntity.ok(summaries);
    }

    @PatchMapping("/userchild/{id}/update-physical")
    public ResponseEntity<UserChild> updateWeightAndHeight(@PathVariable int id, @RequestParam Float weight, @RequestParam Integer height) {
        UserChild updated = userChildService.updateWeightAndHeight(id, weight, height);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}