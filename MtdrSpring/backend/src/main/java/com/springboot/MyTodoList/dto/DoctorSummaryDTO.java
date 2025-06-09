package com.springboot.MyTodoList.dto;

public class DoctorSummaryDTO {
    private int id;
    private String name;

    public DoctorSummaryDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
}