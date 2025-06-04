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

import com.springboot.MyTodoList.model.Hito;
import com.springboot.MyTodoList.service.HitoService;

@RestController
@RequestMapping("/hitos")
public class HitoController {

    @Autowired
    private HitoService hitoService;

    @PostMapping
    public Hito createHito(@RequestBody Hito hito) {
        return hitoService.createHito(hito);
    }

    @DeleteMapping("/{id}")
    public void deleteHito(@PathVariable int id) {
        hitoService.deleteHito(id);
    }

    @GetMapping("/user/{userId}")
    public List<Hito> getHitosByUserId(@PathVariable int userId) {
        return hitoService.getHitosByUserId(userId);
    }

    @GetMapping("/user/{userId}/recent")
    public List<Hito> getTop3RecentHitosByUserId(@PathVariable int userId) {
        return hitoService.getTop3RecentHitosByUserId(userId);
    }
}
