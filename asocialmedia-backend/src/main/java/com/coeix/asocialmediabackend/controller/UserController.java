package com.coeix.asocialmediabackend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.coeix.asocialmediabackend.entity.FileInfo;
import com.coeix.asocialmediabackend.entity.User;
import com.coeix.asocialmediabackend.message.ResponseMessage;
import com.coeix.asocialmediabackend.repository.UserRepository;
import com.coeix.asocialmediabackend.service.FilesStorageService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/admin")
@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	FilesStorageService storageService;


//-------------------------------------------- /findAll --------------------------------------------------
	
	@GetMapping("/findAll")
    public ArrayList<User> findAllUsers() {
		return (ArrayList<User>) userRepository.findAll();
    }
	
	@GetMapping("/getUser/{id}")
	public User getUser(@PathVariable int id) {
	  return userRepository.findById(id).get();
	}


//-------------------------------------------- /delete --------------------------------------------------
	
	@DeleteMapping(value = "/delete/{id}")
	public void deleteUserEclipse(@PathVariable int id) {
		userRepository.deleteById(id);
	}
	
//-------------------------------------------- /update --------------------------------------------------
	
	@PutMapping(value = "/updateOldUser")
	public @ResponseBody User updateUser(@RequestBody User user) {
		User userCheck = userRepository.save(user);
		return userCheck;
	}
	
// -------------------------------------------- /addNewUser ---------------------------------------------

	@PostMapping(value = "/defAddUser")
	public @ResponseBody User createNewUser(@RequestBody User user) {
		System.out.println("create new user: "+user);
		User userCheck = userRepository.save(user);
		return userCheck;
	}
	

// -------------------------------------------- /login --------------------------------------------------
	
	@PostMapping(value = "/login")
	public @ResponseBody User loginProfile(@RequestBody User user) {
		System.out.println("login: "+user.getEmail()+" - "+user.getPassword());
		User userCheck = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		
		System.out.println("utente recuperato " + userCheck);
		
		// ------------------------------ another Session ---------------------------------------
		/*RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
        ServletRequestAttributes attributes = (ServletRequestAttributes) requestAttributes;
        HttpServletRequest request = attributes.getRequest();
        HttpSession session = request.getSession(true);*/
        // Session control
        /*if (userCheck!=null) {
        	session.setAttribute("userLogged", userCheck);*/
        	return userCheck;
        /*}
        else {
        	session.setAttribute("error", "Login error, try again");
        	return new User();
        }*/
		
	}
	
	@GetMapping("/getTableData")
	public @ResponseBody List<User> tabellaDatiDellUtente() {

		List<User> tableUser = (List<User>) userRepository.findAll();

		return tableUser;
	}
//--------------------------------------------------------------- DA CONTROLLARE

	@GetMapping("/files")
	public ResponseEntity<List<FileInfo>> getListFiles() {
		List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
			String filename = path.getFileName().toString();
			String url = MvcUriComponentsBuilder
					.fromMethodName(UserController.class, "getFile", path.getFileName().toString()).build().toString();

			return new FileInfo(filename, url);
		}).collect(Collectors.toList());

		return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
	}

	@DeleteMapping("/deleteFiles")
	public void deleteFiles() {

		System.out.println("entro qui dentro?");

		storageService.deleteAll();

	}

	@DeleteMapping("/deleteSingleFile/{filename}")
	public void deleteSingleFile(@PathVariable String filename) {

		// System.out.println("stampo il filename in arrivo: " + filename);

		// String fileToBeDeleted = filename.replaceAll("[^A-Za-z0-9]", "");

		String fileToBeDeleted = "";

		// System.out.println("stampo " + fileToBeDeleted);

		List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
			String filenameOriginal = path.getFileName().toString();
			String url = MvcUriComponentsBuilder
					.fromMethodName(UserController.class, "getFile", path.getFileName().toString()).build().toString();

			return new FileInfo(filenameOriginal, url);
		}).collect(Collectors.toList());

		for (int i = 0; i < fileInfos.size(); i++) {

			// System.out.println("stampo nome 1 " + fileInfos.get(i).getName());

			if (('"' + fileInfos.get(i).getName() + '"').equals(filename)) {

				// System.out.println("CAZZOOOOOO " + fileInfos.get(i).getName());

				// fileInfos.remove(i);

				fileToBeDeleted = fileInfos.get(i).getName();
			}

		}

		System.out.println("stampo " + fileToBeDeleted);

		storageService.delete(fileToBeDeleted);

		/*
		 * for (int i = 0; i < fileInfos.size(); i++) {
		 * 
		 * System.out.println("stampo nome 2 " + fileInfos.get(i).getName()); if
		 * (fileInfos.get(i).getName().equals(filename)) {
		 * System.out.println("stampo nome " + fileInfos.get(i).getName()); } }
		 */

	}

	@GetMapping("/files/{filename:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		Resource file = storageService.load(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}
}