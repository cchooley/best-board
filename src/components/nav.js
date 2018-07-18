import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Register from './register'
import Login from './login'



const loginURL = 'https://bestboard-db.herokuapp.com/auth/login'
const registerURL = 'https://bestboard-db.herokuapp.com/auth/register'

export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: window.localStorage.token
        }
    }
    render() {

    const token = window.localStorage.token    
    
    return (
        <header>
            <div className="header">
                <div>
                    <h1 className="title"><span className="gold">B</span>est<span className="gold">B</span>oard</h1>
                </div>
                { (token) 
                    ? <div className="logins">
                        <button className="ui blue basic inverted button" onClick={this.props.logOut}>Log Out</button>
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

