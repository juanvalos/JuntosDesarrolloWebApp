package com.springboot.MyTodoList.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.MyTodoList.model.RegistroCrecimiento;
import com.springboot.MyTodoList.repository.RegistroCrecimientoRepository;

@Service
public class RegistroCrecimientoService {

    @Autowired
    private RegistroCrecimientoRepository registroCrecimientoRepository;

    public RegistroCrecimiento createRegistroCrecimiento(RegistroCrecimiento registroCrecimiento) {
        return registroCrecimientoRepository.save(registroCrecimiento);
    }

    public void deleteRegistroCrecimiento(int id) {
        registroCrecimientoRepository.deleteById(id);
    }

    public List<RegistroCrecimiento> getRegistroCrecimientoByUserId(int userId) {
    return registroCrecimientoRepository.findAllByUserIdOrderByDateDesc(userId);
    }

    public List<RegistroCrecimiento> getTop3RecentRegistrosCrecimientoByUserId(int userId) {
    return registroCrecimientoRepository.findTop3ByUserIdOrderByDateDesc(userId);
    }
}
