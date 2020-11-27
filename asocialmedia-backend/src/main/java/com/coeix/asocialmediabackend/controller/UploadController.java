package com.coeix.asocialmediabackend.controller;

import java.nio.file.Path;
import java.nio.file.Paths;

import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
//import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.coeix.asocialmediabackend.repository.EventRepository;
import com.coeix.asocialmediabackend.service.FilesStorageService;

//https://mvnrepository.com/artifact/javax.ws.rs/javax.ws.rs-api/2.1.1

//https://mkyong.com/spring-boot/spring-boot-file-upload-example/

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/eventFile")
@RestController
public class UploadController {
	
	@Autowired
	private EventRepository eventRepository;
	
	@Autowired
	FilesStorageService storageService;
	/*
	@Bean
	public MultipartResolver multipartResolver() {
	    return new CommonsMultipartResolver();
	}*/

    //Save the uploaded file to this folder
    private static String UPLOADED_FOLDER = "../asocialmedia-frontend/public/eventUserImg";
    
    //consumes={"multipart/form-data"}
   
    @PostMapping(value = "/uploadFiles", consumes = MediaType.MULTIPART_FORM_DATA)
    //public void singleFileUpload(@RequestPart("fileName") String fileName) {
    public void singleFileUpload(@RequestPart(name="fileName") String fileName, @RequestParam(required=false, name="fileToUpload") MultipartFile fileToUpload) {
    	
    	Path path = Paths.get(UPLOADED_FOLDER);
    	System.out.println("il file verrà salvato in: " + path);
    	
    	//System.out.println("qui arrivo con " + fileName);
    	System.out.println("qui arrivo con " + fileName + " e " + fileToUpload);
        
    	/*try {
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER);
            System.out.println("stampo questo: "+path);
            //Files.write(path, bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }*/
    }


}