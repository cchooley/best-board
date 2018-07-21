import React, { Component } from 'react';

import Register from './register'
import Login from './login'
import User from './user'

export default class Nav extends Component {
    render() {
        const token = window.localStorage.token
    return (
            <div className="header">
                <div>
                    <h1 className="title"><span className="gold">B</span>est<span className="gold">B</span>oard</h1>
                </div>
                { (token) 
                    ? <div className="loggedIn">
                        <User   user={this.props.user}
                                handleEdit={this.props.handleEdit}
                                handleDelete={this.props.handleDelete}
                                logOut={this.props.logOut} />
                    </div>
                    : <div className="loggedOut">
                        <Register handleRegister={this.props.handleRegister} />
                        <Login handleLogin={this.props.handleLogin} />
                    </div>
                }
            </div>
    )}
}

