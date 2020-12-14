package com.coeix.asocialmediabackend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

// Generate a new table with JPA and Hibernate

@Entity
@Table(name="asocialMediaUser")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false, name = "role")
	private String role;
	
	@Column(nullable = false, name = "name")
	private String name;
	
	@Column(nullable = false, name = "surname")
	private String surname;
	
	@Column(nullable = false, name = "birthDate")
	private String birthDate;
	
	@Column(nullable = false, unique = true, name = "email")
	private String email;
	
	@Column(nullable = false, name = "password")
	private String password;

	
	public int getId() {
		return this.id;
	}
	
	public void setId(int _id) {
		this.id = _id;
	}
	
	public String getRole() {
		return this.role;
	}
	
	public void setRole(String _role) {
		this.role = _role;
	}

	public String getPassword() {
		return this.password;
	}
	
	public void setPassword(String _password) {
		this.password = _password;
	}
	
	public String getSurname() {
		return this.surname;
	}
	
	public void setSurname(String _surname) {
		this.surname = _surname;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setName(String _name) {
		this.name = _name;
	}
	
	public String getBirthDate() {
		return this.birthDate;
	}
	
	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String _email) {
		this.email = _email;
	}
	
	@Override
	public String toString() { 
		return "User [id= " + id + " - role= " + role +" - name= " + name + " - surname= " + surname 
				+ " - email= " + email + " - password=" + password + "]";
	}
}
