import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

import Nav from './nav'
import Edit from './editProfile'
import Delete from './deleteProfile'
import Calendar from './calendar'
import Messages from './messages'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edited: false,
            deleted: false,
        }

    }

    componentDidMount() {
        const token = window.localStorage.token
        if (!token) { 
            window.location.href = '/'
        }
    }

    render() {
        let profile = this.props.userData
        profile.filter(profile => profile.id == this.props.userId)
        if(profile.length) {
            profile = profile[0]
        }
        return (
            <div>              
                <Nav    loggedIn={this.props.loggedIn}
                        logOut={this.props.logOut} />
                <div className="mainDash">
                    <div className="dashView">
                        <div className="sideNav">
                            <h3>Hello, {profile.name}!</h3>
                            <img src={profile.image} className='avatar' size='medium' />
                            <h5>{profile.role}</h5>
                            <h5>{profile.organization}</h5>
                            <h5>{profile.email}</h5>
                            <div className="udContainer">
                                <Edit handleEdit={this.props.handleEdit}
                                    userId={this.props.userId}
                                    handleDelete={this.props.handleDelete}
                                    logOut={this.props.logOut} />
                                <Delete handleDelete={this.props.handleDelete}
                                    userId={this.props.userId} />
                            </div>
                        </div>
                        <h1>
                            Welcome to Bestboard
                        </h1>
                        <Messages />
                        <Calendar />
                    </div>
                </div>
            </div>
        )
    }
}
