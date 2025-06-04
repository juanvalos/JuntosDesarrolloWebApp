package com.springboot.MyTodoList.dto;

public class UserChildSummaryDTO {
    private int id;
    private String name;

    public UserChildSummaryDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
}