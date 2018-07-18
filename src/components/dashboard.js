import React, { Component } from 'react';
import { Divider, Button, Modal, Form } from 'semantic-ui-react'

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
        let profile = this.props.userData.filter(profile => profile.id == window.localStorage.userId)[0]
        if (!profile) {
            return null
        }

        return (
            <div>              
                <Nav    userId={this.props.userId}
                        loggedIn={this.props.loggedIn}
                        logOut={this.props.logOut} />
                <div className="mainDash">
                    <div className="dashView">
                        <div className="sideNav">
                            <Divider horizontal>Profile</Divider>
                            <img src={profile.image} className='avatar' size='medium' />
                            <h4>{profile.name}</h4>
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
                        <div className="tasks">
                            <Divider horizontal>
                                Action Items
                            </Divider>
                            <ul>
                                <li>Do this</li>
                                <li>Do this</li>
                                <li>Do this</li>
                            </ul>
                        </div>
                        <Messages />
                        <Calendar />
                    </div>
                </div>
            </div>
        )
    }
}
