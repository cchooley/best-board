import React from 'react';
import { Button, Card, Modal, Image, Form } from 'semantic-ui-react'

import Edit from './editProfile'
import Delete from './deleteProfile'


const ProfileMenu = (props) => {
    let profile = props.profile
    return (
        <Modal trigger={<span>View Profile</span>}>
        <Modal.Content>
            <Card>
                <Image src={profile.image} />
                <Card.Content>
                    <Card.Header>{profile.name}</Card.Header>
                    <Card.Meta>Member since {profile.memberSince}</Card.Meta>
                    <h5>Email: {profile.email}</h5>
                    <h5>Organization: {profile.organization}</h5>
                    <h5>Role: {profile.role}</h5>
                    <h5>Term Expires in {profile.termExpires}</h5>
                    <h5>Committees: {profile.committees}</h5>
                </Card.Content>
            </Card>
        </Modal.Content>
        </Modal>
    )
}

export default ProfileMenu;

