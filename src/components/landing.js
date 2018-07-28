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
                    <div className="innerLeft">
                        <div className="leftLand">
                            <h1 className="hLanding">Welcome back.</h1>
                            <h3>Login below</h3>
                            <div className="landButton">
                                <Login      handleLogin={this.props.handleLogin} 
                                            updateUserID={this.props.updateUserID}/>
                            </div>
                        </div>
                    </div>
                    <div className="innerRight">
                        <div className="rightLand">
                            <h1 className="hLanding">Get in motion.</h1>
                            <h3>Create your own account</h3>
                            <div className="landButton">
                                <Register handleActivity={this.props.handleActivity}
                                    handleRegister={this.props.handleRegister}
                                    updateUserID={this.props.updateUserID} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )}
}