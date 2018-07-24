import React from 'react';
import { Card, Modal, Image } from 'semantic-ui-react'

import Edit from './editProfile'


const ProfileMenu = (props) => {
    let profile = props.profile
    return (
        <Modal trigger={<span>View Profile</span>} size="mini">
        <Modal.Content>
            <Card fluid>
                <Image className="cardPhoto" src={profile.image} />
                <Card.Content>
                    <h3>{profile.name}</h3>
                    <Card.Meta>Member since {profile.memberSince}</Card.Meta>
                    <h5>Email: {profile.email}</h5>
                    <h5>Organization: {profile.organization}</h5>
                    <h5>Role: {profile.role}</h5>
                    <h5>Term Expires in {profile.termExpires}</h5>
                    <h5>Committees: {profile.committees}</h5>
                </Card.Content>
                <Card.Content>
                    <Edit />
                </Card.Content>
            </Card>
        </Modal.Content>
        </Modal>
    )
}

export default ProfileMenu;

