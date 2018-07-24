import React from 'react';
import { Card, Image, Divider, Modal } from 'semantic-ui-react'

import Delete from './deleteProfile'

const Admin = (props) => {
    let allProfiles = props.userData.map(profile => {
        return (
            <Card>
                <Card.Content>
                    <Image className="cardPhoto" floated='right' size='mini' src={profile.image} />
                    <h4 className="cardHeader">{profile.name}</h4>
                    <Card.Meta>{profile.role}</Card.Meta>
                    <Card.Description>
                        <p>{profile.email}</p>
                        <p>Member since {profile.memberSince}</p>
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    })
    return (
        <Modal trigger={<span>View Profiles</span>}>
            <Modal.Header>Board roster.</Modal.Header>
            {allProfiles}
        </Modal>
    )
}

export default Admin;
