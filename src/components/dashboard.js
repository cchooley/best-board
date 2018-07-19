import React, { Component } from 'react';
import { Divider, Menu, Dropdown, Button, Modal, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import Nav from './nav'
import ProfileMenu from './profileMenu'
import Edit from './editProfile'
import Delete from './deleteProfile'
import Vote from './vote'

import Calendar from './calendar'
import Messages from './messages'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edited: false,
            deleted: false,
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
                        <div className="sideNav">
                            <Divider horizontal>Profile</Divider>
                            <img src={profile.image} className='avatar' size='medium' />
                            <h4>{profile.name}</h4>
                            <h5>{profile.role}</h5>
                            <h5>{profile.organization}</h5>
                            <h5>{profile.email}</h5>
                            <div className="udContainer">
                                <Menu vertical>
                                    <Dropdown item text='Categories'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                <Edit   handleEdit={this.props.handleEdit}
                                                        userId={this.props.userId}
                                                        logOut={this.props.logOut} />
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Delete handleDelete={this.props.handleDelete}
                                                        userId={this.props.userId}
                                                        logOut={this.props.logOut} />
                                            </Dropdown.Item>
                                            <Dropdown.Item><ProfileMenu /></Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu>
                                {/* <ProfileMenu    handleEdit={this.props.handleEdit}
                                                userId={this.props.userId}
                                                handleDelete={this.props.handleDelete}
                                                logOut={this.props.logOut} /> */}
                            </div>
                        </div>
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
