import React, { Component } from 'react';
import { Router, Link, Redirect } from 'react-router-dom'

import Nav from './nav'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginEmail: '',
            loginPassword: '',
            loggedIn: false,
        }
    }

    // getUsers() {
    //     const userURL = 'https://bestboard-db.herokuapp.com/users'
    //     fetch(userURL)
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({
    //                 userData: data.users
    //             })
    //         })
    // }

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
                
                <Nav />
                <div className="mainDash">
                    <div className="sideNav">
                        <h3>Hello, {profile.name}!</h3>
                        <img src={profile.image} alt="avatar"></img>
                        <h4>{profile.role}</h4>
                        <h4>{profile.organization}</h4>
                        <h4>{profile.email}</h4>
                    </div>
                </div>
            </div>
        )
    }
}
