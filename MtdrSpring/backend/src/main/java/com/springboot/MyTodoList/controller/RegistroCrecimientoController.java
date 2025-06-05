package com.springboot.MyTodoList.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.MyTodoList.model.RegistroCrecimiento;
import com.springboot.MyTodoList.service.RegistroCrecimientoService;
import com.springboot.MyTodoList.service.UserChildService;

@RestController
@RequestMapping("/registro-crecimiento")
public class RegistroCrecimientoController {

    @Autowired
    private RegistroCrecimientoService registroCrecimientoService;

    @Autowired
    private  UserChildService userChildService;

    @PostMapping
    public RegistroCrecimiento createRegistroCrecimiento(@RequestBody RegistroCrecimiento registroCrecimiento) {
        RegistroCrecimiento nuevo = registroCrecimientoService.createRegistroCrecimiento(registroCrecimiento);
        userChildService.updateChildInfo(
            registroCrecimiento.getUserId(),
            registroCrecimiento.getWeight(),
            registroCrecimiento.getHeight(),
            registroCrecimiento.getAge()
        );
        return nuevo;
    }

    @DeleteMapping("/{id}")
    public void deleteRegistroCrecimiento(@PathVariable int id) {
        registroCrecimientoService.deleteRegistroCrecimiento(id);
    }

    @GetMapping("/user/{userId}")
    public List<RegistroCrecimiento> getRegistroCrecimientoByUserId(@PathVariable int userId) {
        return registroCrecimientoService.getRegistroCrecimientoByUserId(userId);
    }

    @GetMapping("/user/{userId}/recent")
    public List<RegistroCrecimiento> getTop3RecentRegistrosCrecimientoByUserId(@PathVariable int userId) {
        return registroCrecimientoService.getTop3RecentRegistrosCrecimientoByUserId(userId);
    }
}
