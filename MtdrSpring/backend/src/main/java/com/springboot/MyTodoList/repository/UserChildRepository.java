package com.springboot.MyTodoList.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.MyTodoList.model.UserChild;

@Repository
public interface UserChildRepository extends JpaRepository<UserChild, Integer> {
    UserChild getUserById(int id);
}