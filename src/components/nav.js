import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Register from './register'
import Login from './login'
import Dashboard from './dashboard'
import jwtDecode from 'jwt-decode'



const loginURL = 'https://bestboard-db.herokuapp.com/auth/login'
const registerURL = 'https://bestboard-db.herokuapp.com/auth/register'

export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    logOut = () => {
        delete window.localStorage.token
        window.location.href = '/'
    }

    render() {
        if (this.state.loggedIn === true) {
            return (
            <div>
                <Redirect to='/dashboard' />
            </div>
            )
    }

    return (
        <header>
            <div className="header">
                <div>
                    <h1 className="title"><span className="gold">B</span>est<span className="gold">B</span>oard</h1>
                </div>
                { (window.localStorage.token) 
                    ? <div className="logins">
                        <button className="ui blue basic inverted button" onClick={this.logOut}>Log Out</button>
                    </div>
                    : <div className="logins">
                        <Register handleRegister={this.props.handleRegister} />
                        <Login handleLogin={this.props.handleLogin} />
                    </div>
                }
            </div>
        </header>
    )}
}

