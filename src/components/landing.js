import React, { Component } from 'react'

import Register from './register'
import Login from './login'
import Nav from './nav'

export default class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            window.location.href = '/dashboard'
        }
    }

    render () {

        return (
            <div>
                <Nav    userId={this.props.userId}
                        handleLogin={this.props.handleLogin}
                        updateUserID={this.props.updateUserID}
                        loggedIn={this.props.loggedIn}/>
                <div className="mainLand">
                    <div className="innerLand">
                        <h1 className="big gold">Get in motion.</h1>
                        <h3>Welcome to <span className="gold">BestBoard</span>, the number one new app for managing productivity in non-profit governance.</h3>
                        <h3>Create your own account or login below.</h3>
                        <div className="landButton">
                            <Register   handleActivity={this.props.handleActivity}
                                        handleRegister={this.props.handleRegister}
                                        updateUserID={this.props.updateUserID} />
                            <Login      handleLogin={this.props.handleLogin} 
                                        updateUserID={this.props.updateUserID}/>
                        </div>
                    </div>
                </div>
            </div>
    )}
}