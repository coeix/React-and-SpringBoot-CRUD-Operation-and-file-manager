package com.coeix.asocialmediabackend.controller;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.coeix.asocialmediabackend.entity.User;
import com.coeix.asocialmediabackend.entity.Event;
import com.coeix.asocialmediabackend.repository.EventRepository;
import com.coeix.asocialmediabackend.repository.UserRepository;


// con CrossOrigin si autorizza il controller a ricevere chiamate da altre porte
// * qualsiasi porta, altrimenti si può impostare la porta 3000 per react o altre per altri
// 3600 è il tempo di attesa prima di dare errore di connessione

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/event")
@RestController
public class EventController {
	
	@Autowired
	private EventRepository eventRepository;
	
	// -------------------------------------------- /addNewEvent ---------------------------------------------

	@PostMapping(value = "/addEvent")
	public void createNewEvent(@RequestBody Event event) {
		System.out.println("create new event: " + event);
		eventRepository.save(event);
		
	}
	
	


}


