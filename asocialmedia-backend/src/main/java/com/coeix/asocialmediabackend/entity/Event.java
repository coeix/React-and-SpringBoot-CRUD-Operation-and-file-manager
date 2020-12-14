package com.coeix.asocialmediabackend.entity;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

// Generate a new table with JPA and Hibernate

@Entity
@Table(name="asocialMediaEvent")
public class Event {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false, name = "title")
	private String title;

	@Column(nullable = false, name = "date")
	private String date;
	
	@Column(name = "description")
	private String description;

	@Column(nullable = false, name = "userRef")
	private String userRef;
	
	@Column(nullable = false, name = "userTagged")
	private String userTagged;
	
	@Column(name = "imgPath")
	private ArrayList<String> imgPath;
	
	@Column(nullable = false, name = "visibility")
	private int visibility;
	// 1 = public
	// 2 = private
	
	@Column(nullable = false, name = "weHaveImg")
	private int weHaveImg;
	// 0 = no
	// 1 = yes
	
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public String getUserRef() {
		return userRef;
	}

	public void setUserRef(String userRef) {
		this.userRef = userRef;
	}

	public String getUserTagged() {
		return userTagged;
	}

	public void setUserTagged(String userTagged) {
		this.userTagged = userTagged;
	}

	public ArrayList<String> getImgPath() {
		return imgPath;
	}

	public void setImgPath(ArrayList<String> imgPath) {
		this.imgPath = imgPath;
	}

	public int getVisibility() {
		return visibility;
	}

	public void setVisibility(int visibility) {
		this.visibility = visibility;
	}
	
	public int getWeHaveImg() {
		return weHaveImg;
	}

	public void setWeHaveImg(int weHaveImg) {
		this.weHaveImg = weHaveImg;
	}
	
	@Override
	public String toString() {
		return "Event [id= " + id + " - title= " + title + " - date= " + date + " /n - userRef= " + userRef 
				+ " - userTagged= " + userTagged + " /n - imgPath= " +imgPath + " /n - visibility= " + visibility 
				+ " - weHaveImg= " + weHaveImg + "]";
	}
}
