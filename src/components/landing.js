import React, { Component } from 'react';

import Register from './register'
import Login from './login'

const loginURL = 'https://bestboard-db.herokuapp.com/auth/login'
const registerURL = 'https://bestboard-db.herokuapp.com/auth/register'

export default class Landing extends Component {
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
                } else {
                    alert("This didn't work because:" + result.error)
                }
            })
    }

    render () {
        return (
            <div class="mainLand">
                <div class="innerLand">
                    <h2 class="big gold">Get in motion.</h2>
                    <h3>Welcome to <span class="gold">BestBoard</span>, the number one new app for managing productivity in non-profit governance.</h3>
                    <h3>Create your own account or login below.</h3>
                    <div class="landButton">
                        <Register handleRegister={this.handleRegister} />
                        <Login handleLogin={this.handleLogin} />
                    </div>
                </div>
            </div>
    )}
}