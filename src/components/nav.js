import React, { Component } from 'react';

import Register from './register'
import Login from './login'
import User from './user'

export default class Nav extends Component {
    componentDidMount() {

    }

    render() {
    const token = window.localStorage.token
    if (token) {
        return (
            <div className="header">
                <div className="loggedIn">
                    <User user={this.props.user}
                        userData={this.props.userData}
                        handleEdit={this.props.handleEdit}
                        handleDelete={this.props.handleDelete}
                        logOut={this.props.logOut}
                        handlePoll={this.props.handlePoll} />
                </div>
                <div>
                    <h1 className="title"><span className="gold">B</span>est<span className="gold">B</span>oard</h1>
                </div>
            </div>
            )
        } else {
        return (
            <div className="header">
                <div>
                    <h1 className="title"><span className="gold">B</span>est<span className="gold">B</span>oard</h1>
                </div>
            </div>
            )
        }
    }
}

