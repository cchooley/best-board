import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

import Delete from './deleteProfile'

const Edit = (props) => {
    return (
        <Modal trigger={<button className="ui black basic inverted button" role="button">Edit</button>}>
            <Modal.Header>Update your profile.</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form onSubmit={(event) => props.handleEdit(event, props.userId)}>
                        <Form.Field>
                            <label>Name</label>
                            <input name='name'
                                value={props.name} />
                        </Form.Field>
                        <Form.Field>
                            <label>E-Mail Address</label>
                            <input name='email'
                                value={props.email} />
                        </Form.Field>
                        <Form.Field>
                            <label>Profile Image</label>
                            <input name='image'
                                value={props.image} />
                        </Form.Field>
                        <Form.Field>
                            <label>Organization</label>
                            <input name='organization'
                                value={props.organization} />
                        </Form.Field>
                        <Form.Field>
                            <label>Role in Organization</label>
                            <input name='role'
                                value={props.role} />
                        </Form.Field>
                        <Button type="submit">Submit</Button>
                        <Delete />
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default Edit;
