import React, { Component } from 'react';
import { Button, Card, Image, Form, Modal } from 'semantic-ui-react'

import Edit from './editProfile'

class AdminEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edited: false
        }
    }


    handleEdit2 = (event, id) => {
        event.preventDefault()
        let usersURL = 'https://bestboard-db.herokuapp.com/users'
        const editURL = `${usersURL}/${id}`
        const formData = new FormData(event.target)
        const body = JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            image: formData.get("image"),
            organization: formData.get("organization"),
            role: formData.get("role"),
        })
        fetch(editURL, {
            method: "PUT",
            headers: new Headers({ "content-type": "application/json" }),
            body: body
        })
        .then(response => response.json())
        .then(response => {
            if(response) {
                window.location.reload()
            }
        })
    }

    reload = () => {
        window.location.reload()
    }

    render() {

        let allProfiles = this.props.userData.map(profile => {
        return (
            <Card>
                <Card.Content>
                    <Image className="cardPhoto" floated='right' size='tiny' src={profile.image} />
                    <h4 className="cardHeader">{profile.name}</h4>
                    <Card.Meta>{profile.role}</Card.Meta>
                    <Card.Meta>Company ID: {profile.id}</Card.Meta>
                    <Card.Description>{profile.email}</Card.Description>
                    <Card.Description>Member since {profile.memberSince}</Card.Description>
                </Card.Content>
                <Button floated='right'>
                    <Edit   id={profile.id}
                            handleEdit2={this.handleEdit2} />
                </Button>
            </Card>
        )
    })
    return (
        <Modal trigger={<span>Manage Profiles</span>} closeOnDimmerClick={false} >
            <Modal.Header>
                <div className="mHeader">
                    Board Roster 
                    <Button onClick={this.reload}>Close</Button>
                </div>
            </Modal.Header>
            <Modal.Content>
                {allProfiles}
            </Modal.Content>
        </Modal>
    )
}
}

export default AdminEdit;
