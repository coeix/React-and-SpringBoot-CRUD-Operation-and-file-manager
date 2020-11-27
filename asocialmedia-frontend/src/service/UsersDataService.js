import axios from 'axios'

// creiamo gli indirizzi per chiamare le url delle entità di cui ci serviremo
const CONTROLLER_API_URL = 'http://localhost:8080'
const ADMIN_API_URL = `${CONTROLLER_API_URL}/admin`

class UsersDataService {

    retrieveAllUsers() {
        return axios.get(`${ADMIN_API_URL}/findAll`);
    }

    deleteUser(id) {
        return axios.delete(`${ADMIN_API_URL}/delete/${id}`);
    }

    updateUser(user) {
        return axios.put(`${ADMIN_API_URL}/updateOldUser`, user);
    }

    retrieveUser(id) {
        return axios.get(`${ADMIN_API_URL}/getUser/${id}`);
    }

    createUser(user) {
        return axios.post(`${ADMIN_API_URL}/defAddUser`, user);
    }

    loginUser(user){
        return axios.post(`${ADMIN_API_URL}/login`, user);
    }
}


export default new UsersDataService()

