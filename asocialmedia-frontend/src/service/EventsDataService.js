import axios from 'axios'
//import {AddNewEvent} from '../component/AddNewEvent.jsx';

// creiamo gli indirizzi per chiamare le url delle entità di cui ci serviremo
const CONTROLLER_API_URL = 'http://localhost:8080'
const ADMIN_API_URL = `${CONTROLLER_API_URL}/event`

class EventsDataService {

    createEvent(event) {
        //(<AddNewEvent func ={this.upload()} />)
        //alert("create new event: " + JSON.stringify(event))
        //return axios.post(`${ADMIN_API_URL}/addEvent`, event);
        return alert("create new event: " + JSON.stringify(event))
    }
}

export default new EventsDataService()

