import React, { Component } from 'react';
import { Divider, Menu, Dropdown, Button, Modal, Form } from 'semantic-ui-react'

import Admin from './editProfile'
import Delete from './deleteProfile'
import ProfileMenu from './profileMenu'
import CreatePoll from './createPoll'

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edited: false,
            deleted: false
        }

    }

    handlePoll = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const votesURL = 'https://bestboard-db.herokuapp.com/votes'
        const body = JSON.stringify({
            name: formData.get("name"),
            issue: formData.get("issue"),
            openedOn: new Date(),
            createdBy: this.props.user.name,
            option1: "Yes",
            option2: "No",
            option3: "Abstain",
            yesVote: 0,
            noVote: 0,
            abVote: 0,
            votedYes: [],
            votedNo: [],
            votedAb: []
        })
        fetch(votesURL, {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: body
        })
    }

    render() {
        let profile = this.props.user
        if (!profile) {
            return null
        }
        
        return (
            <div className="userProfile">
                <Menu>
                    <Dropdown className="drop" pointing text='Categories'>
                        {
                            (this.props.user.role == "Admin")
                                ? <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Admin handleEdit={this.props.handleEdit}
                                            userId={this.props.userId}
                                            logOut={this.props.logOut} />
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <ProfileMenu profile={this.props.user} />
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <CreatePoll handlePoll={this.handlePoll} 
                                                    user={this.props.user} />
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Delete handleDelete={this.props.handleDelete}
                                            userId={this.props.userId}
                                            logOut={this.props.logOut} />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={this.props.logOut}>
                                        <span>Logout</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                                : <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <ProfileMenu profile={this.props.user} />
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Delete handleDelete={this.props.handleDelete}
                                            userId={this.props.userId}
                                            logOut={this.props.logOut} />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={this.props.logOut}>
                                        <span>Logout</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                        }
                    </Dropdown>
                </Menu>
                <img src={profile.image} className='avatar' size='small' />
            </div>
        )
    }
}

