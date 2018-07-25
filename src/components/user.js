import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react'
import moment from "moment";

import Delete from './deleteProfile'
import ProfileMenu from './profileMenu'
import CreatePoll from './createPoll'
import AdminEdit from './viewProfiles';

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edited: false,
            deleted: false,
            created: false
        }

    }

    handlePoll = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const votesURL = 'https://bestboard-db.herokuapp.com/votes'
        const activitiesURL = 'https://bestboard-db.herokuapp.com/activities'
        const body = JSON.stringify({
            name: formData.get("name"),
            issue: formData.get("issue"),
            openedOn: moment(),
            closedOn: formData.get("closedOn"),
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
        const body2 = JSON.stringify({
            createdBy: this.props.user.name,
            image: this.props.user.image,
            openedOn: moment(),
            activity: 'created a poll'
        })
        fetch(votesURL, {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: body
        })
        .then(response => response.json())
        .then(() => {
            fetch(activitiesURL, {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                body: body2
        })
        .then(result => {
            if(result) {
                window.location.reload()
            }
        })}
    )}
    render() {
        let profile = this.props.user
        if (!profile) {
            return null
        }
        
        return (
            <div className="userProfile">
                <img src={profile.image} className='avatar' size='small' />
                <Menu>
                    <Dropdown inline pointing text='Menu'>
                        {
                            (this.props.user.role == "Admin")
                                ? <Dropdown.Menu>
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
                                    <Dropdown.Item className="admin" direction='left'>
                                        <Dropdown closeOnBlur text='Admin'>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <AdminEdit  userData={this.props.userData} 
                                                                handleEdit={this.props.handleEdit} />
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
            </div>
        )
    }
}

