import axios from 'axios'

const CONTROLLER_API_URL = 'http://localhost:8080'
const USER_API_URL = `${CONTROLLER_API_URL}/fileUser`

class UploadFilesService {
    upload(file, filenames, onUploadProgress) {
        alert("ambarabà "+ filenames)
        let filename = localStorage.getItem('imgFilename')
        alert("localostorage dentro upload "+ filename)
        let formData = new FormData();
        var extension= file.name.split('.').pop();
        filename = filename.replace(/"/g,""); 
        filename = filename+"."+extension
        alert("vediamo che esce: " +filename)
        formData.append("file", file);
        formData.append("filename", filename)
        //localStorage.removeItem("imgFilename")
        return axios.post(`${USER_API_URL}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    deleteFile(filename) {
        //alert("stampo filename " + filename)
        return axios.delete(`${USER_API_URL}/deleteSingleFile/${filename}`);
    }

    deleteFiles() {

        return axios.delete(`${USER_API_URL}/deleteFiles`);
    }

    getFiles() {
        return axios.get(`${USER_API_URL}/files`);
    }
}

export default new UploadFilesService();
