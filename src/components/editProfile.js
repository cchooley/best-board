import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

import Delete from './deleteProfile'

const Admin = (props) => {
    return (
        <Modal trigger={<span>Admin</span>}>
            <Modal.Header>Update your profile.</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form onSubmit={(event) => props.handleAdmin(event, window.localStorage.userId)}>
                        <Form.Field>
                            <label>Name</label>
                            <input name='name' />
                        </Form.Field>
                        <Form.Field>
                            <label>E-Mail Address</label>
                            <input name='email'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Profile Image</label>
                            <input name='image' />
                        </Form.Field>
                        <Form.Field>
                            <label>Organization</label>
                            <input name='organization' />
                        </Form.Field>
                        <Form.Field>
                            <label>Role in Organization</label>
                            <input name='role'/>
                        </Form.Field>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default Admin;
