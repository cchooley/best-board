import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Register from './register'
import Login from './login'
import Nav from './nav'


const loginURL = 'https://bestboard-db.herokuapp.com/auth/login'
const registerURL = 'https://bestboard-db.herokuapp.com/auth/register'

export default class Landing extends Component {


    render () {
        const token = window.localStorage.token
        if (token) {
            return (
                <div>
                    <Redirect to='/dashboard' />
                </div>
            )
        }

        return (
            <div>
                <Nav    updateUserID={this.props.updateUserID}
                        handleRegister={this.props.handleRegister}
                        handleLogin={this.props.handleLogin}/>
                <div className="mainLand">
                    <div className="innerLand">
                        <h2 className="big gold">Get in motion.</h2>
                        <h3>Welcome to <span className="gold">BestBoard</span>, the number one new app for managing productivity in non-profit governance.</h3>
                        <h3>Create your own account or login below.</h3>
                        <div className="landButton">
                            <Register   handleRegister={this.props.handleRegister}
                                        updateUserID={this.props.updateUserID} />
                            <Login      handleLogin={this.props.handleLogin} 
                                        updateUserID={this.props.updateUserID}/>
                        </div>
                    </div>
                </div>
            </div>
    )}
}