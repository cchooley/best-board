import React from 'react';
import { Button, Card, Image, Divider, Modal } from 'semantic-ui-react'

import Edit from './editProfile'

const Admin = (props) => {
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
                <Button floated='right'><Edit /></Button>
            </Card>
        )
    })
    return (
        <Modal trigger={<span>Manage Profiles</span>}>
            <Modal.Header>Board roster</Modal.Header>
            <Modal.Content>
                {allProfiles}
            </Modal.Content>
        </Modal>
    )
}

export default Admin;
