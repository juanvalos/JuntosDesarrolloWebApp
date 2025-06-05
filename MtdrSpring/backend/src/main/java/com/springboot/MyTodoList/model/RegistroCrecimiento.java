package com.springboot.MyTodoList.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity@Table(name = "REGISTRO_CRECIMIENTO", schema = "TODOUSER")
public class RegistroCrecimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "weight", nullable = false)
    private Float weight;

    @Column(name = "height", nullable = false)
    private int height;

    @Column (name = "fecha")
    private Date date;

    @Column(name = "age")
    private int age;

    @Column(name = "user_id", nullable = false)
    private int userId;

    public RegistroCrecimiento() {}

    public RegistroCrecimiento(Float weight, int height, Date date, int userId) {
        this.weight = weight;
        this.height = height;
        this.date = date;
        this.userId = userId;

    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}