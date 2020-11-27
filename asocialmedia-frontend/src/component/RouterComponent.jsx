// here there is the routing of the web application

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUsersComponent from "./ListUsersComponent.jsx";
//import AdminComponent from "./AdminComponent.jsx";
import UserOperationComponent from "./UserOperationComponent";
import LoginComponent from "./LoginComponent.jsx";
import UploadFiles from "./UploadFiles.jsx";
import {AddNewEvent} from "./AddNewEvent.jsx"

import React from "react";

const AppRouter = () => {
    return(
        <div>
            <Router>
                <div>
                    {/*className="col-md-6 offset-3"*/}
                    <Switch>
                        <Route path="/users" exact component={ListUsersComponent} />
                        <Route path="/user/:id" component={UserOperationComponent} />
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/prova" exact component={UploadFiles} />
                        <Route path="/addNewEvent" exact component={AddNewEvent} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default AppRouter;