import React, { Component } from "react";
import UploadFilesService from '../service/UploadFilesService.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UsersDataService from '../service/UsersDataService';
import AliceCarousel from 'react-alice-carousel';
import EventsDataService from '../service/EventsDataService';
import $ from 'jquery';

export class AddNewEvent extends Component {
    constructor(props) {
        super(props);
        this.upload = this.upload.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.refreshFiles = this.refreshFiles.bind(this);
        this.deleteFileClicked = this.deleteFileClicked.bind(this);
        this.deleteFilesClicked = this.deleteFilesClicked.bind(this);
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            selectedFiles: undefined,
            selectedFile: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            fileInfos: [],

            //users: [],
            //message: null,
            //pictures: [],
            userLogged: JSON.parse(localStorage.getItem('userSession')),
            title: '',
            date: '',
            description: '',
            userTagged: '',
            visibility: '',
            weHaveImg: "0",
            //imgFile: null,
            imgPreview: '',
            //file: null
        };
    }

    // ----------------------- componentDidMount ---------------------------------------------
    componentDidMount() {
        UploadFilesService.getFiles().then((response) => {
            this.setState({
                fileInfos: response.data,
            });
        });
    }

    // ----------------------- onDrop for ImageUploader input form -----------------------------
    /* chiamata del <ImageUploader>
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        alert (" che c'è qui?: " + JSON.stringify(this.state.pictures))
    }
    */

    // ----------------------- logout from localStorage ---------------------------------------
    logout() {
        localStorage.clear()
        this.props.history.push(`/`)
    }
    // ----------------------- logout from localStorage ---------------------------------------
    goHome() {
        this.props.history.push(`/users`)
    }

    // ----------------------- refreshFiles -----------------
    refreshFiles() {
        UploadFilesService.getFiles().
            then((response) => {
                this.setState({
                    fileInfos: response.data,
                });
            });
    }

    // ----------------------- deleteFilesClicked(event) -----------------
    deleteFileClicked(event) {

        //alert(event.target.value)

        setTimeout(() => this.setState({
            selectedFile: event.target.value,
        }), 1000);

        setTimeout(() =>

            UploadFilesService.deleteFile(JSON.stringify(this.state.selectedFile)).
                then(() => {
                    console.log("ok");
                    this.refreshFiles();
                })
            , 2000);
    }

    // ----------------------- deleteFilesClicked -----------------
    deleteFilesClicked() {

        //alert("entro qui?");
        UploadFilesService.deleteFiles().
            then(() => {
                this.refreshFiles();
            });
    }

    // ----------------------- selectFile ----------------- 
    selectFile(event) {
        this.setState({
            // this is for the img to save
            selectedFiles: event.target.files,
            // this is only for the preview of the img
            imgPreview: URL.createObjectURL(event.target.files[0])
        });
        //$('#weHaveImg').attr('value', '1')
        //alert (" stampo il value di weHaveImg " + $('#weHaveImg').val())
        
        this.setState({ weHaveImg: "1" })
        /*
        const timer = setTimeout(() => {
            alert("vediamo lo state: " + this.state.weHaveImg)
        }, 2000);
        */

        // Here to upload the file immidiatly
        /*
        const timer = setTimeout(() => {
            this.upload()
        }, 2000);
        */
    }

    // ----------------------- onSubmit formik button ------------------------------------------
    onSubmit(values) {
        // dentro al formik non posso usare state ma posso usare status
        // https://github.com/formium/formik/issues/312

        let sharedEvent = {
            title: values.title,
            date: values.date,
            description: values.description,
            userRef: (JSON.parse(localStorage.getItem('userSession')))['id'],
            userTagged: values.userTagged,
            imgPath: (JSON.parse(localStorage.getItem('userSession')))['id'] + "_" + values.date + "_" + values.title,
            visibility: values.visibility,
            weHaveImg: values.weHaveImg
        }
        // if there is an img to upload
        if (sharedEvent.weHaveImg === '1'){
            // replace white space in imgPath
            var correctFilename = sharedEvent.imgPath ;
            correctFilename = correctFilename.replace(/ /g,"-"); 
            sharedEvent.imgPath = correctFilename

            // memorizzare il nome dentro lo status invece che nel localstorage
            localStorage.setItem('ImgFilename', correctFilename);
            //alert("onSubmit image name: "+ localStorage.getItem('ImgFilename'))
            const timer = setTimeout(() => {
                $('#goUpload').click()
            }, 3000);
        }
        else {
            sharedEvent.imgPath = "nofile"
            alert("no image uploaded")
        }
        //alert ("sharedEvent = " + JSON.stringify(sharedEvent))
        
        // create event
        //EventsDataService.createEvent(sharedEvent)
        
        //alert ("sono alla fine dell'onSubmit")
        //FilesDataService.uploadFile((localStorage.getItem('userImgData')),(JSON.stringify(sharedEvent.imgPath)))
    
        //alert("dopo")
        //https://mkyong.com/spring-boot/spring-boot-file-upload-example/
    }

    // ----------------------- upload -----------------
    upload() {
        let currentFile = this.state.selectedFiles[0];
        let filename = null
        if (localStorage.getItem('imgFilename') != null){
            filename = localStorage.getItem('imgFilename')
        }
        else{
            filename = "Something bad appened"
        }
        alert("upload imgFilename: "+ filename)
        this.setState({
            progress: 0,
            currentFile: currentFile,
        });
        // save file in storage folder
        UploadFilesService.upload(currentFile,filename, (event) => {
            this.setState({ progress: Math.round((100 * event.loaded) / event.total) });
        })
            .then((response) => {
                this.setState({ message: response.data.message });
                return UploadFilesService.getFiles();
            })
            .then((files) => {
                this.setState({ fileInfos: files.data });
            })
            .catch(() => {
                this.setState({
                    progress: 0,
                    message: "Could not upload the file!",
                    currentFile: undefined,
                });
            });

        this.setState({ selectedFiles: undefined });

    }

    // ----------------------- onChange allow the typing in the formik input -----------------
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // ----------------------- Header ---------------------------------------------------------
    showHeader() {
        if (this.state.userLogged != null) {
            return (
                <div className="page">
                    <div class="row">
                        <div class="col-8">
                            <h2>Hello {this.state.userLogged['name']} {this.state.userLogged['surname']}</h2>
                        </div>
                        <div class="col-sm">
                            <button className="btn btn-light" onClick={this.goHome}>
                                <span>My Events </span>
                                <svg width="16px" height="16px" viewBox="0 0 16 16" class="bi bi-calendar4-week" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
                                    <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                </svg>
                            </button>
                        </div>
                        <div class="col-sm">
                            <button className="btn btn-light" onClick={this.logout}>
                                <span>Logout </span>
                                <svg width="16px" height="16px" viewBox="0 0 16 16" class="bi bi-door-closed-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M4 1a1 1 0 0 0-1 1v13H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2a1 1 0 0 0-1-1H4zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            )
        }
    }

    // ----------------------- validate the formik input data ---------------------------------
    validate(values) {
        let errors = {}
        if (!values.title) {
            errors.title = `Enter a Title`
        }
        if (!values.date) {
            errors.date = `Enter a Date`
        }
        if (!values.visibility) {
            errors.visibility = `Select your preference`
        }
        return errors
    }

    // ----------------------- saveImg ---------------------------------------------------------
    saveImg() {
        document.getElementById('file-id').click();
    }

    // ----------------------- where the show begin -------------------------------------------
    render() {
        const { selectedFiles, selectedFile, currentFile, progress, message, fileInfos } = this.state;
        let { title, date, description, userTagged, visibility, weHaveImg, img, imgData } = this.state

        return (
            <div>
                {(() => {
                    // ----------------------- Check user logged ------------------------
                    if (this.state.userLogged == null) {

                        return (this.props.history.push(`/`))
                        // eventualmente settare una variabile con un messaggio di errore
                    }
                    // ----------------------- OK user is logged ------------------------
                    else {
                        // ----------------------- Admin page ---------------------------
                        if (this.state.userLogged.role == 'admin') {
                            return (this.props.history.push(`/users`))
                        }
                        else {
                            // ----------------------- User page ------------------------
                            return (
                                <div>
                                    {this.showHeader()}
                                    <div className="page">
                                        <h4>Add New Event</h4> <br />
                                        {/* // un altro modo di fare upload del file che però non ho capito come funziona
                                        <ImageUploader
                                            withIcon={true}
                                            buttonText='Choose images'
                                            onChange={this.onDrop}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                            maxFileSize={5242880}
                                        />*/}
                                        <Formik
                                            initialValues={{ title, date, description, userTagged, visibility, weHaveImg, img, imgData }}
                                            onSubmit={this.onSubmit}
                                            validateOnChange={false}
                                            validateOnBlur={false}
                                            validate={this.validate}
                                            enableReinitialize={true}
                                        >
                                            {
                                                (props) => (
                                                    <Form>
                                                        {/* ----------------------- insert New Event ------------------------ */}
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <fieldset className="form-group">
                                                                        <ErrorMessage name="title" component="div" className="alert alert-danger" />
                                                                        <Field className="myform" type="text" name="title" placeholder="insert the event Title" onChange={this.onChange} />
                                                                        <label>Title</label>
                                                                    </fieldset>
                                                                    <fieldset className="form-group">
                                                                        <ErrorMessage name="date" component="div" className="alert alert-danger" />
                                                                        <Field className="myform" type="date" name="date" placeholder="10-10-2020" onChange={this.onChange} />
                                                                        <label>Date</label>
                                                                    </fieldset>
                                                                    <fieldset className="form-group">
                                                                        <Field className="myform" as="textarea" name="description" placeholder="tell me more about this event..." onChange={this.onChange} />
                                                                        <label>Description</label>
                                                                    </fieldset>
                                                                    <fieldset className="form-group">
                                                                        {(() => {
                                                                            // DA ABILITARE QUANDO SISTEMO LA POSSIBILITà DI TAGGARE ALTRI UTENTI
                                                                            // <ErrorMessage name="userTagged" component="div" className="alert alert-danger" />
                                                                        })()}
                                                                        <Field className="myform" type="text" name="userTagged" placeholder="insert your mentioned friend" onChange={this.onChange} />
                                                                        <label>User Tagged - to do...</label>
                                                                    </fieldset>
                                                                    <fieldset className="form-group">
                                                                        <label>Who can see your event?</label><br />
                                                                        <ErrorMessage name="visibility" component="div" className="alert alert-danger" />
                                                                        <Field id="radioFormikPub" type="radio" name="visibility" value="1" onChange={this.onChange} />
                                                                        <label>Everyone (Public)</label><br />
                                                                        <Field id="radioFormikPri" type="radio" name="visibility" value="2" onChange={this.onChange} />
                                                                        <label>Only me (Private)</label>
                                                                    </fieldset>
                                                                    <fieldset style={{display:'none'}}>
                                                                        <Field id="weHaveImg" type="text" name="weHaveImg" />
                                                                    </fieldset>
                                                                    <br />
                                                                    <button className="btn btn-success" type="submit">Save</button>
                                                                    <button id="goUpload" style={{display:'none'}} onClick={this.upload} />
                                                                </div>
                                                                {/* ----------------------- img section ------------------------ */}
                                                                <div className="col-sm-6">
                                                                    <fieldset className="form-group">
                                                                        {/* ----------------------- carousel section ------------------------ 
                                                                        Gestire successivamene l'upload di più immagini
                                                                        https://stackoverflow.com/questions/59451364/multiple-file-upload-with-reactjs*/}
                                                                        <>
                                                                            <AliceCarousel autoPlay autoPlayInterval="3000">
                                                                                {(() => {
                                                                                    if (this.state.selectedFiles != null) {
                                                                                        return (<img src={this.state.imgPreview} className="sliderimg" />)
                                                                                    }
                                                                                    else
                                                                                        return (<img onClick={this.saveImg} src="./thumbnail_photo.jpg" className="sliderimg" />)
                                                                                })()}
                                                                            </AliceCarousel>
                                                                        </>
                                                                        {currentFile && (
                                                                            <div className="progress">
                                                                                <div
                                                                                    className="progress-bar progress-bar-info progress-bar-striped"
                                                                                    role="progressbar"
                                                                                    aria-valuenow={progress}
                                                                                    aria-valuemin="0"
                                                                                    aria-valuemax="100"
                                                                                    style={{ width: progress + "%" }}
                                                                                >
                                                                                    {progress}%
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        <label onClick={this.saveImg}>Add New Photo: </label>
                                                                        <br />
                                                                        <label className="btn btn-default" id="file-id">
                                                                            <input type="file" name="img" onChange={this.selectFile} />
                                                                        </label>
                                                                        <div className="alert alert-light" role="alert">
                                                                            {message}
                                                                        </div>
                                                                    </fieldset>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )
                                            }
                                        </Formik>
                                    </div>
                                </div>
                            )
                        }
                    }
                })()}







                <div className="page">

                    <div className="card">
                        <div className="card-header">List of Files</div>
                        <ul className="list-group list-group-flush">
                            {fileInfos &&
                                fileInfos.map((file, index) => (
                                    <li className="list-group-item" key={index}>
                                        {((file.name).includes("png") || (file.name).includes("jpg") ?
                                            <span><a href={file.url}>
                                                <img src={file.name} /></a>
                                                <button className="btn btn-success" value={file.name} onClick={this.deleteFileClicked}>Delete</button>
                                            </span> : null)}
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <br></br>
                    <button className="btn btn-success" onClick={this.deleteFilesClicked}>Delete All</button>

                </div>

            </div>
        );
    }
}