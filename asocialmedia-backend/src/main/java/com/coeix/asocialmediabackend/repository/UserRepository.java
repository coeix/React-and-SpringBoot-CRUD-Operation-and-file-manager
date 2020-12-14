package com.coeix.asocialmediabackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.coeix.asocialmediabackend.entity.User;


@Repository
public interface UserRepository extends CrudRepository<User, Integer>{
	
	User findByEmailAndPassword(String email, String password);
}

/*
 * Una classe Repository contiene tutto il codice relativo alla persistenza ma nessuna
 * logica di business. Fornisce metodi per inserire, aggiornare e rimuovere un’entità
 * e metodi che istanziano ed eseguono query specifiche. L‘obiettivo di questo pattern
 * è quello di separare il codice per la persistenza dal codice di business e a migliorare
 * la riusabilità del codice relativo alla persistenza. Rende anche più facile la scrittura 
 * e la leggibilità  del  codice, perché è possibile concentrarsi sulla implementazione 
 * dei requisiti anziché sull’interazione con il database.
 * 
 * https://attacomsian.com/blog/spring-data-jpa-query-annotation#
 * 
 */
