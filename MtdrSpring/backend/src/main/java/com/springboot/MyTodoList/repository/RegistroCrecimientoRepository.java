package com.springboot.MyTodoList.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.MyTodoList.model.RegistroCrecimiento;

@Repository
public interface RegistroCrecimientoRepository extends JpaRepository<RegistroCrecimiento, Integer> {
    List<RegistroCrecimiento> findAllByUserIdOrderByDateDesc(int id);

    List<RegistroCrecimiento> findTop3ByUserIdOrderByDateDesc(int userId);

}