package com.springboot.MyTodoList.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.MyTodoList.model.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findAllByDoctorIdOrderByDateDesc(int doctorId);

    List<Note> findTop3ByDoctorIdOrderByDateDesc(int doctorId);

    List<Note> findByChildIdOrderByDateDesc(int childId);

    List<Note> findTop3ByChildIdOrderByDateDesc(int childId);
}