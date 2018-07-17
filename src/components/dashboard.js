import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

import Nav from './nav'
import Edit from './editProfile'
import Delete from './deleteProfile'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edited: false,
            deleted: false
        }
    }

    componentDidMount() {
        if (!window.localStorage.token) { 
            window.location.href = '/'
        }
    }

    render() {
        let profile = this.props.userData
            .filter(profile => profile.id == this.props.userId)
        if(profile.length) {
            profile = profile[0]
        }

        return (
            <div>              
                <Nav logOut={this.props.logOut} />
                <div className="mainDash">
                    <div className="sideNav">
                        <h3>Hello, {profile.name}!</h3>
                        <img src={profile.image} className='avatar' size='medium' />
                        <h5>{profile.role}</h5>
                        <h5>{profile.organization}</h5>
                        <h5>{profile.email}</h5>
                        <Edit   handleEdit={this.props.handleEdit} 
                                userId={this.props.userId} />
                        <Delete handleDelete={this.props.handleDelete}
                                userId={this.props.userId} 
                                logOut={this.props.logOut} />
                    </div>
                </div>
            </div>
        )
    }
}
