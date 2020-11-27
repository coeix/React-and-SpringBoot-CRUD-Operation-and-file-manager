// here there is the list of the users
// only admin can see it

import React, { Component } from 'react';
// import dei file di javrascript che contiene i percorsi delle funzioni
import UsersDataService from '../service/UsersDataService';
import EventsDataService from '../service/EventsDataService';
import axios, { post } from 'axios';
//import ImageUploader from 'react-images-upload';

// Components are like functions that return HTML elements.
class ListUsersComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null,
            userLogged: JSON.parse(localStorage.getItem('userSession')),
        }

        // const userLogged = JSON.parse(localStorage.getItem('userSession'))
        // alert("userLogged = "+JSON.stringify(this.state.userLogged['id']))

        // dobbiamo assicurarci che il metodo sia vincolato a this nel costruttore
        this.refreshUsers = this.refreshUsers.bind(this)
        this.deleteUserById = this.deleteUserById.bind(this)
        this.findUserById = this.findUserById.bind(this)
        this.addNewUser = this.addNewUser.bind(this)
        this.logout = this.logout.bind(this)
        this.showHeader = this.showHeader.bind(this)
        this.addNewEvent = this.addNewEvent.bind(this)
        //this.onDrop = this.onDrop.bind(this)
    }

    // controlla se il componente è stato costruito - è come il document.ready
    // ----------------------- componentDidMount ---------------------------------------------
    componentDidMount() {
        this.refreshUsers();
    }

    // ----------------------- refreshUsers is the retrieveAllUsers() call -------------------
    refreshUsers() {
        // questa sintassi corrisponde al success della chiamata ajax 
        UsersDataService.retrieveAllUsers()
            .then(
                // equivale al result
                response => {
                    console.log(response);
                    // costruisce un oggetto javascript - se ci sono le "" allora crea un oggetto Json
                    this.setState({ users: response.data })
                }
            )
    }

    // ----------------------- deleteUserById is the deleteUser() call -----------------------
    deleteUserById(id) {
        UsersDataService.deleteUser(id)
            .then(
                response => {
                    this.setState({ message: `Delete User ID: ${id} Successful` })
                    this.refreshUsers()
                }
            )
    }

    // ----------------------- findUserById ---------------------------------------------------
    findUserById(id) {
        console.log('update ' + id)
        this.props.history.push(`/user/${id}`)
    }

    // ----------------------- addNewUser -----------------------------------------------------
    addNewUser() {
        this.props.history.push(`/user/-1`)
    }

    // ----------------------- logout from localStorage ---------------------------------------
    logout() {
        localStorage.clear()
        this.props.history.push(`/`)
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

    // ----------------------- Add new Event --------------------------------------------------
    addNewEvent(){
        this.props.history.push(`/addNewEvent`)
    }

    // render si occupa di visualizzarti graficamente quello che è al suo interno
    // ----------------------- where the show begin -------------------------------------------
    render() {
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
                            return (
                                <div>
                                    {this.showHeader()}
                                    <div className="page">
                                        <h3>All Users</h3><br />
                                        {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                                        {/* ----------------------- table header ------------------------ */}
                                        <div>
                                            <table className="table border">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Role</th>
                                                        <th>Name</th>
                                                        <th>Surname</th>
                                                        <th>Birth Date</th>
                                                        <th>Email</th>
                                                        <th>Password</th>
                                                        <th>Delete</th>
                                                        <th>Update</th>
                                                    </tr>
                                                </thead>
                                                {/* ----------------------- users table ------------------------ */}
                                                <tbody>
                                                    {/* for each syntax */}
                                                    {
                                                        this.state.users.map(
                                                            user =>
                                                                <tr className="border" key={user.id}>
                                                                    <td>{user.id}</td>
                                                                    <td>{user.role}</td>
                                                                    <td>{user.name}</td>
                                                                    <td>{user.surname}</td>
                                                                    <td>{user.birthDate}</td>
                                                                    <td>{user.email}</td>
                                                                    <td>{user.password}</td>
                                                                    <td><button className="btn btn-warning" onClick={() => this.deleteUserById(user.id)}>Delete</button></td>
                                                                    <td><button className="btn btn-success" onClick={() => this.findUserById(user.id)}>Update</button></td>
                                                                </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                            <div className="row">
                                                <button className="btn btn-success" onClick={this.addNewUser}>Add new User</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            // ----------------------- User page ------------------------
                            return (
                                <div>
                                    {this.showHeader()}
                                    <div className="page">
                                        <h4>My Profile</h4>
                                        <button className="btn btn-success" onClick={this.addNewEvent}>Add New Event</button>
                                        
                                    </div>
                                </div>
                            )
                        }
                    }
                })()}
            </div>

        )
    }
}
export default ListUsersComponent;