import React, { Component } from 'react';
import { Button } from "semantic-ui-react"

import Register from './register'
import Login from './login'

const loginURL = 'https://bestboard-db.herokuapp.com/auth/login'
const registerURL = 'https://bestboard-db.herokuapp.com/auth/register'

export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginEmail: '',
            loginPassword: '',
            loggedIn: false
        }
    }

    handleLogin = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const body = JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password")
        })
        fetch(loginURL, {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: body
        })
            .then(response => response.json())
            .then(result => {
                if (result.token) {
                    window.localStorage.token = result.token
                    this.setState({
                        loggedIn: !this.state.loggedIn
                    })
                } else {
                    alert(result.error)
                }
            })
    }

    handleRegister = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const body = JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            organization: formData.get("organization"),
            role: formData.get("role"),
            password: formData.get("password")
        })
        fetch(registerURL, {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: body
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.token) {
                    window.localStorage.token = result.token
                    this.setState({
                        loggedIn: !this.state.loggedIn
                    })
                } else {
                    alert("This didn't work because:" + result.error)
                }
            })
    }


    logOut = () => {
        delete window.localStorage.token
    }


    render() {
        if(this.state.loggedIn) {
            return (
                <div>
                //redirect here
                    <Button onClick={this.logOut}>Logout</Button>
                </div>
            )
        }

    const token = window.localStorage.token

    return (
        <header>
            {!token ? (
            <div class="header">
                <div>
                    <h1 class="title"><span class="gold">B</span>est<span class="gold">B</span>oard</h1>
                </div>
                <div class="logins">
                    <Register handleRegister={this.handleRegister} />
                    <Login handleLogin={this.handleLogin} />
                </div>
            </div>
            ) : (
                <Button onClick={this.logOut}>Logout</Button>
            )}
        </header>
    )}
}