import axios from 'axios'
//import {AddNewEvent} from '../component/AddNewEvent.jsx';

// creiamo gli indirizzi per chiamare le url delle entità di cui ci serviremo
const CONTROLLER_API_URL = 'http://localhost:8080'
const ADMIN_API_URL = `${CONTROLLER_API_URL}/event`

class EventsDataService {

    createEvent(event) {
        //localStorage.setItem('imgFilename',JSON.stringify(event.imgPath))
        //(<AddNewEvent func ={this.upload()} />)
        return alert("questo è il return di createEvent " + JSON.stringify(event.imgPath))
        //return axios.post(`${ADMIN_API_URL}/defAddEvent`, event);
    }

}


export default new EventsDataService()

