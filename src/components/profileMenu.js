import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

import Edit from './editProfile'
import Delete from './deleteProfile'

const ProfileMenu = (props) => {
    return (
        <Modal trigger={<span>View Profile</span>}>
        <Modal.Header>Profile</Modal.Header>
        <div>
            <Edit  />
            <Delete />
        </div>
        </Modal>
    )
}

export default ProfileMenu;

