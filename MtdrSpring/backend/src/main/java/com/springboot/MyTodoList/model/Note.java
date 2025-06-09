package com.springboot.MyTodoList.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "NOTE", schema = "TODOUSER")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false, length = 50)
    private String title;

    @Column(name = "description", nullable = false, length = 500)
    private String description;

    @Column(name = "fecha", nullable = false)
    private Date date;

    @Column(name = "doctor_id", nullable = false)
    private int doctorId;

    @Column(name = "child_id", nullable = false)
    private int childId;

    public Note() {
    }

    public Note(String title, String description, Date date, int doctorId, int childId) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.doctorId = doctorId;
        this.childId = childId;
    }


    // Getters and Setters

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public int getdoctorId() {
        return doctorId;
    }
    public void setdoctorId(int doctorId) {
        this.doctorId = doctorId;
    }
    public int getchildId() {
        return childId;
    }
    public void setchildId(int childId) {
        this.childId = childId;
    }
}