package com.springboot.MyTodoList.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.MyTodoList.dto.UserChildSummaryDTO;
import com.springboot.MyTodoList.model.UserChild;
import com.springboot.MyTodoList.repository.UserChildRepository;

@Service
public class UserChildService {

    @Autowired
    private UserChildRepository userChildRepository;

    public UserChild getUserById(int id) {
        return userChildRepository.findById(id).orElse(null);
    }

    public List<UserChild> getAllUsers() {
        return userChildRepository.findAll();
    }

    public UserChild createUserChild(UserChild userChild) {
        return userChildRepository.save(userChild);
    }

    public List<UserChildSummaryDTO> getAllUserSummaries() {
    return userChildRepository.findAll()
        .stream()
        .map(u -> new UserChildSummaryDTO(u.getId(), u.getName()))
        .collect(Collectors.toList());
    }

    public UserChild updateWeightAndHeight(int id, Float weight, int height) {
    UserChild user = userChildRepository.findById(id).orElse(null);
    if (user != null) {
        user.setWeight(weight);
        user.setHeight(height);
        return userChildRepository.save(user);
    }
    return null;
}
}