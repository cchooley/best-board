import React, { Component } from 'react';
import { Divider, Menu, Dropdown, Button, Modal, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import Nav from './nav'
import User from './user'
import Vote from './vote'
import Calendar from './calendar'
import Messages from './messages'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.userData
                .filter(profile => profile.id == window.localStorage.userId)[0]
        }

    }

    componentDidMount() {
            const token = window.localStorage.token
            if (!token) {
                window.location.href = '/'
            }
        }

    render() {
        let profile = this.state.user
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
                    <User   user={this.state.user} 
                            handleEdit={this.props.handleEdit}
                            handleDelete={this.props.handleDelete} />
                        <div className="innerLeft">
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
                            <div className="votes">
                                <Divider horizontal>
                                    Open Polls
                                </Divider>
                                    <Vote   user={this.state.user}
                                            yesVote={this.props.yesVote}
                                            voteData={this.props.voteData} 
                                            getVotes={this.props.getVotes} />
                            </div>
                        </div>
                        <Messages />
                        <Calendar />
                    </div>
                </div>
            </div>
        )
    }
}
