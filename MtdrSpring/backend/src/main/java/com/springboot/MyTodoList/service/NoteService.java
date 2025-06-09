package com.springboot.MyTodoList.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.MyTodoList.model.Note;
import com.springboot.MyTodoList.repository.NoteRepository;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public void deleteNote(int id) {
        noteRepository.deleteById(id);
    }

    public List<Note> getNotesByDoctorId(int doctorId) {
    return noteRepository.findAllByDoctorIdOrderByDateDesc(doctorId);
    }

    public List<Note> getTop3RecentNotesByDoctorId(int doctorId) {
    return noteRepository.findTop3ByDoctorIdOrderByDateDesc(doctorId);
    }

    public List<Note> getNotesByChildId(int childId) {
        return noteRepository.findByChildIdOrderByDateDesc(childId);
    }

    public List<Note> getTop3RecentNotesByChildId(int childId) {
        return noteRepository.findTop3ByChildIdOrderByDateDesc(childId);
    }
}
