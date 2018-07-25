import React from 'react';
import { Card, Modal, Image, Button } from 'semantic-ui-react'

import Edit from './editProfile'

let reload = () => {
    window.location.reload()
}

const ProfileMenu = (props) => {

    let profile = props.profile
    return (
        <Modal trigger={<span>View Profile</span>} size="mini" closeOnDimmerClick={false}>
        <Modal.Content>
            <Card fluid>
                <Image className="cardPhoto" src={profile.image} />
                <Card.Content>
                    <h3>{profile.name}</h3>
                    <Card.Meta>Member since {profile.memberSince}</Card.Meta>
                    <Card.Description>Email: {profile.email}</Card.Description>
                    <Card.Description>Organization: {profile.organization}</Card.Description>
                    <Card.Description>Role: {profile.role}</Card.Description>
                    <Card.Description>Term Expires in {profile.termExpires}</Card.Description>
                    <Card.Description>Committees: {profile.committees}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Edit />
                    <Button onClick={reload}>Close</Button>
                </Card.Content>
            </Card>
        </Modal.Content>
        </Modal>
    )
}

export default ProfileMenu;

