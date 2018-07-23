import React from 'react';
import { Button, Divider, Modal, Form } from 'semantic-ui-react'

import Delete from './deleteProfile'

const Admin = (props) => {
    let allProfiles = props.userData.map(profile => {
        return (
            <div>
                <h4>{profile.name}</h4>
                <h5>{profile.role}</h5>
                <h5>{profile.email}</h5>
                <h5>Member since: {profile.memberSince}</h5>
                <Divider />
            </div>
        )
    })
    return (
        <Modal trigger={<span>View Profiles</span>}>
            <Modal.Header>Here are all of your board members.</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <div>{allProfiles}</div>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default Admin;
