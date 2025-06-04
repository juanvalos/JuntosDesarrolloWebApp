package com.springboot.MyTodoList.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.MyTodoList.model.Hito;
import com.springboot.MyTodoList.repository.HitoRepository;

@Service
public class HitoService {

    @Autowired
    private HitoRepository hitoRepository;

    public Hito createHito(Hito hito) {
        return hitoRepository.save(hito);
    }

    public void deleteHito(int id) {
        hitoRepository.deleteById(id);
    }

    public List<Hito> getHitosByUserId(int userId) {
    return hitoRepository.findAllByUserIdOrderByDateDesc(userId); // Usa el nuevo método
    }

    public List<Hito> getTop3RecentHitosByUserId(int userId) {
    return hitoRepository.findTop3ByUserIdOrderByDateDesc(userId);
}
}
