// it create a new user or update the older one

import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import UsersDataService from '../service/UsersDataService';

// create a new component to represent the todo form
class AdminComponent extends Component {
    // If there is a constructor() function in your component, this function will be called when the component gets initiated.
    // The constructor function is where you initiate the component's properties and is called, by React, every time you make a component
    // Props are arguments passed into React components passed to components via HTML attributes.
    // React Props are like function arguments in JavaScript and attributes in HTML.
    constructor(props) {
        // The constructor function is also where you honor the inheritance of the parent component 
        // by including the super() statement, which executes the parent component's constructor function, 
        // and your component has access to all the functions of the parent component
        super(props)
        // component properties should be kept in an object called state.
        this.state = {
            id: this.props.match.params.id,
            role: 'user',
            name: '',
            surname: '',
            birthDate: '',
            email: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.Return = this.Return.bind(this)
    }

    // The componentDidMount() method is called after the component is rendered.
    // This is where you run statements that requires that the component is already placed in the DOM.
    componentDidMount() {
        console.log(this.state.id)
        // alert("stampo il this.state.id " + this.state.id)
        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }
        UsersDataService.retrieveUser(this.state.id)
            .then(response => this.setState({
                id: response.data.id,
                role: response.data.role,
                name: response.data.name,
                surname: response.data.surname,
                birthDate: response.data.birthDate,
                email: response.data.email,
                password: response.data.password
            }))
    }
    // ----------------------- onSubmit action after onClick for the update or creation of a new user ------------------------
    onSubmit(values) {
        if (this.state.id === -1) {
            // ------- new user section -------
            let user = {
                role: values.role,
                name: values.name,
                surname: values.surname,
                birthDate: values.birthDate,
                email: values.email,
                password: values.password
            }
            UsersDataService.createUser(user)
                .then(() => this.props.history.push('/users'))
        } else {
            // ------- update section -------
            let user = {
                id: this.state.id,
                role: values.role,
                name: values.name,
                surname: values.surname,
                birthDate: values.birthDate,
                email: values.email,
                password: values.password
            }
            UsersDataService.updateUser(user)
                .then(() => this.props.history.push('/users'))
        }
        //console.log(values);
    }

    // ----------------------- Return button on the formik tag ------------------------
    Return(){
        this.props.history.push('/users')
    }

    // The component requires a render() method, this method returns HTML
    // ----------------------- where the show begin ------------------------ 
    render() {
        let { id, role, name, surname, birthDate, email, password} = this.state
        // set tempId for a better view in the formik input
        let tempId = ""
        if (id == -1){
            // ------- for update section -------
            tempId = "New User ID autogenereted"
            //alert("tempId = "+tempId)
        }
        else {
            // ------- for new user section -------
            tempId = id
            //alert("tempId = "+tempId)
        }
        return (
            <div className="page">
            {/* ----------------------- Header ------------------------ */}
            {(() => {
                if (id == -1) {
                    return (<h3>Create new User</h3>)
                } 
                else {
                    return (<h3>Update {name} {surname}</h3>)
                }
            })()}
            <br/>
            <div>
                <Formik initialValues={{ id, role, name, surname, birthDate, email, password }}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <Field className="myform" type="text" name="id" disabled value={tempId}/>
                                    <label>Id</label>
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field className="myform" type="text" name="role" placeholder="user"/>
                                    <label>Site role (admin or user)</label>
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field className="myform" type="text" name="name" placeholder="My Name"/>
                                    <label>Name</label>
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field className="myform" type="text" name="surname" placeholder="My Last Name"/>
                                    <label>Last Name</label>
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field className="myform" type="date" name="birthDate"/>
                                    <label>Birth Date</label>
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field className="myform" type="email" name="email" placeholder="myemail@email.com"/>
                                    <label>Email Address</label>
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field className="myform" type="text" name="password" placeholder="My Password"/>
                                    <label>Password</label>
                                </fieldset>
                                <div className="row">
                                    <button className="btn btn-success col-sm-2" type="submit">Save</button>
                                    <button className="btn btn-warning col-sm-2" onClick={() => this.Return()}>Return</button>
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
export default AdminComponent