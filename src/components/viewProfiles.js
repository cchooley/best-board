import React, { Component } from 'react';
import { Button, Card, Image, Modal } from 'semantic-ui-react'

import Edit from './editProfile'

class NestedModal extends Component {
    state = { open: false }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render() {
        const { open } = this.state

        return (
            <Edit
            open={open}
            onOpen={this.open}
            onClose={this.close} />
        )
    }
}

const AdminEdit = (props) => {
        let allProfiles = props.userData.map(profile => {
        return (
            <Card>
                <Card.Content>
                    <Image className="cardPhoto" floated='right' size='tiny' src={profile.image} />
                    <h4 className="cardHeader">{profile.name}</h4>
                    <Card.Meta>{profile.role}</Card.Meta>
                    <Card.Description>{profile.email}</Card.Description>
                    <Card.Description>Member since {profile.memberSince}</Card.Description>
                </Card.Content>
                <Button floated='right'><NestedModal /></Button>
            </Card>
        )
    })
    return (
        <Modal trigger={<span>Manage Profiles</span>}>
            <Modal.Header>Board Roster</Modal.Header>
            <Modal.Content image>
                {allProfiles}
            </Modal.Content>
        </Modal>
    )
}

export default AdminEdit;
