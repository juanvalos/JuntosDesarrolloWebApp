package com.springboot.MyTodoList.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.MyTodoList.model.Hito;

@Repository
public interface HitoRepository extends JpaRepository<Hito, Integer> {
    List<Hito> findAllByUserIdOrderByDateDesc(int userId);

    List<Hito> findTop3ByUserIdOrderByDateDesc(int userId);
}