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

import com.springboot.MyTodoList.model.Note;
import com.springboot.MyTodoList.service.NoteService;

@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping
    public Note createHito(@RequestBody Note note) {
        return noteService.createNote(note);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable int id) {
        noteService.deleteNote(id);
    }

    @GetMapping("/user/{doctorId}")
    public List<Note> getNotesByDoctorId(@PathVariable int doctorId) {
        return noteService.getNotesByDoctorId(doctorId);
    }

    @GetMapping("/user/recent/{doctorId}")
    public List<Note> getTop3RecentNotesByDoctorId(@PathVariable int doctorId) {
        return noteService.getTop3RecentNotesByDoctorId(doctorId);
    }

    @GetMapping("/child/{childId}")
    public List<Note> getNotesByChildId(@PathVariable int childId) {
        return noteService.getNotesByChildId(childId);
    }
    
    @GetMapping("/child/recent/{childId}")
    public List<Note> getTop3RecentNotesByChildId(@PathVariable int childId) {
        return noteService.getTop3RecentNotesByChildId(childId);
    }
}
