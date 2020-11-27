// it include the first page with the login and the sing up form
// in the sing up form admin is not setted - only user

import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import UsersDataService from '../service/UsersDataService';

export default class LoginSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            role: "user",
            name: '',
            surname: '',
            birthDate: '',
            email: '',
            password: '',
            activeTab: 'login',
            message: null,
            error: false,
            errorName: null,
            errorSurname: null,
            errorBirthDate: null,
            errorEmail: null,
            errorPassword: null
        };
        //this.baseState = this.state
        this.baseState = {
            name: '',
            surname: '',
            birthDate: '',
            email: '',
            password: '',
            errorName: null,
            errorSurname: null,
            errorBirthDate: null,
            errorEmail: null,
            errorPassword: null
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.showError = this.showError.bind(this)
        this.validate = this.validate.bind(this)

    }
    // ----------------------- onSubmit action after onClick of login or sing up action ------------------------
    onSubmit(values) {
        // ------- login section -------
        if (this.state.activeTab == 'login') {
            let user = {
                email: values.email,
                password: values.password
            }
            UsersDataService.loginUser(user)
                .then(
                    // ------- user and psw check -------
                    response => {
                        if (response.data == "") {
                            this.setState({ 
                                message: `Email or Password are not correct! Please Try Again` ,
                                error: true
                            })
                            this.showError()
                        }
                        else {
                            // costruisce un oggetto javascript - se ci sono le "" allora crea un oggetto Json
                            this.setState({ user: response.data })
                            localStorage.setItem('userSession', JSON.stringify(this.state.user));
                            this.props.history.push('/users')
                        }
                    }
                )
        // ------- create new user  -------
        } else {
            let user = {
                role: "user",
                name: values.name,
                surname: values.surname,
                birthDate: values.birthDate,
                email: values.email,
                password: values.password
            }
            this.validate(user)
            if (user.name != '' && user.surname != '' && user.birthDate != '' && user.email != '' && user.password != ''){
                UsersDataService.createUser(user)
                    .then(
                        // ------- new user check -------
                        response => {
                            if (response.data == "") {
                                this.setState({ 
                                    message: `Some field are not correct! Please enter them again`,
                                    error: true
                                })
                                this.showError()
                            }
                            else {
                                this.setState({ 
                                    message: `Registration completed! Log in now`,
                                    error: false
                                })
                                this.showError()
                                this.toggle('login')
                            }
                        }
                    )
            } else {
                this.setState({ 
                    message: `Some field are not correct! Please enter them again`,
                    error: true
                })
                this.showError()
            }
        }
    }

    // ----------------------- onChange allow the typing in the formik input ------------------------
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ 
            errorName: null,
            errorSurname: null,
            errorBirthDate: null,
            errorEmail: null,
            errorPassword: null,
            message: null
        })
    }

    // ----------------------- validate the formik input data ------------------------
    validate(values) {
        if (!values.name) {
            this.setState({ errorName: `Enter your Name`})
        } 
        if (!values.surname) {
            this.setState({ errorSurname: `Enter your Last Name`})
        }
        if (!values.birthDate) {
            this.setState({ errorBirthDate: `Enter your Birth Date`})
        }
        if (!values.email) {
            this.setState({ errorEmail: `Enter your Email Address`})
        }
        if (values.password.length < 5) {
            this.setState({ errorPassword: `Enter at least 5 Characters in Password`})
            if (!values.password) {
                this.setState({ errorPassword: `Enter your Password`})
            }
        }
      }

    // ----------------------- toggle handle the tabs bar ------------------------
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
        this.setState(this.baseState);
        /*
        if (this.state.activeTab == 'login'){
            this.setState({ message: null })
        }
        */
    }

    // ----------------------- showError print the right color or the error message ------------------------ 
    showError() {
        if (this.state.error == true) {
            return this.state.message && <div class="alert alert-danger">{this.state.message}</div>
        }
        else {
            return this.state.message && <div class="alert alert-success">{this.state.message}</div>
        }
    }

    // ----------------------- where the show begin ------------------------ 
    render() {
        let { name, surname, birthDate, email, password } = this.state
        return (
            <div className="page">
                {this.showError()}
                {/* ----------------------- Navbar ------------------------ */}
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === 'login' })}
                            onClick={() => { this.toggle('login'); }}>
                            <h5>Login</h5>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === 'singUp' })}
                            onClick={() => { this.toggle('singUp'); }}>
                            <h5>Sing Up</h5>
                        </NavLink>
                    </NavItem>
                </Nav>
                {/* --------------------- Login ------------------------ */}
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="login">
                        <Row>
                            <Col sm="12">
                                <br /><br />
                                <Formik initialValues={{ email, password }}
                                    onSubmit={this.onSubmit}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    enableReinitialize={true}>
                                    {
                                        (props) => (
                                            <Form>
                                                {/* --------------------------------- email input ---------------------------- */}
                                                <fieldset className="form-group">
                                                    {(() => {
                                                        if (this.state.errorEmail != null)
                                                        return (<div class="alert alert-danger">{this.state.errorEmail}</div>)
                                                    })()}
                                                    <Field className="myform" type="email" name="email" placeholder="enter your email address" onChange={this.onChange} />
                                                    <label>Email Address</label>
                                                </fieldset>
                                                {/* --------------------------------- psw input ------------------------------ */}
                                                <fieldset className="form-group">
                                                    {(() => {
                                                        if (this.state.errorPassword != null)
                                                        return (<div class="alert alert-danger">{this.state.errorPassword}</div>)
                                                    })()}
                                                    <Field className="myform" type="text" name="password" placeholder="enter your password" onChange={this.onChange} />
                                                    <label>Password</label>
                                                </fieldset>
                                                <div className="row">
                                                    <button className="btn btn-success col-sm-2" type="submit">Login</button>
                                                </div>
                                            </Form>
                                        )
                                    }
                                </Formik>
                                <br />
                            </Col>
                        </Row>
                    </TabPane>
                    {/* --------------------- Sing up ----------------------- */}
                    <TabPane tabId="singUp">
                        <Row>
                            <Col sm="12">
                                <br /><br />
                                <Formik initialValues={{ name, surname, birthDate, email, password }}
                                    onSubmit={this.onSubmit}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    enableReinitialize={true}
                                >
                                    {
                                        (props) => (
                                            <Form>
                                                <fieldset className="form-group">
                                                    <Field className="myform" type="text" name="id" disabled value='New User ID autogenereted' />
                                                    <label>Id</label>
                                                </fieldset>
                                                {/* --------------------------------- name input ----------------------------- */}
                                                <fieldset className="form-group">
                                                    {(() => {
                                                        if (this.state.errorName != null)
                                                        return (<div class="alert alert-danger">{this.state.errorName}</div>)
                                                    })()}
                                                    <Field className="myform" type="text" name="name" placeholder="My Name" onChange={this.onChange} />
                                                    <label>Name</label>
                                                </fieldset>
                                                {/* --------------------------------- ast name input ------------------------- */}
                                                <fieldset className="form-group">
                                                    {(() => {
                                                        if (this.state.errorSurname != null)
                                                        return (<div class="alert alert-danger">{this.state.errorSurname}</div>)
                                                    })()}
                                                    <Field className="myform" type="text" name="surname" placeholder="My Last Name" onChange={this.onChange} />
                                                    <label>Last Name</label>
                                                </fieldset>
                                                {/* --------------------------------- birth date input ----------------------- */}
                                                <fieldset className="form-group">
                                                    {(() => {
                                                        if (this.state.errorBirthDate != null)
                                                        return (<div class="alert alert-danger">{this.state.errorBirthDate}</div>)
                                                    })()}
                                                    <Field className="myform" type="date" name="birthDate" placeholder="01-01-2000" onChange={this.onChange} />
                                                    <label>Birth Date</label>
                                                </fieldset>
                                                {/* --------------------------------- email input ---------------------------- */}
                                                <fieldset className="form-group">
                                                    {(() => {
                                                        if (this.state.errorEmail != null)
                                                        return (<div class="alert alert-danger">{this.state.errorEmail}</div>)
                                                    })()}
                                                    <Field className="myform" type="email" name="email" placeholder="myemail@email.com" onChange={this.onChange} />
                                                    <label>Email Address</label>
                                                </fieldset>
                                                {/* --------------------------------- psw input ------------------------------ */}
                                                <fieldset className="form-group">
                                                    {(() => {
                                                        if (this.state.errorPassword != null)
                                                        return (<div class="alert alert-danger">{this.state.errorPassword}</div>)
                                                    })()}
                                                    <Field className="myform" type="text" name="password" placeholder="My Password" onChange={this.onChange} />
                                                    <label>Password</label>
                                                </fieldset>
                                                {/* --------------------------------- button --------------------------------- */}
                                                <div className="row">
                                                    <button className="btn btn-success col-sm-2" type="submitf">Save</button>
                                                </div>
                                            </Form>
                                        )
                                    }
                                </Formik>
                                <br />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}