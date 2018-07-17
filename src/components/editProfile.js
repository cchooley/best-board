import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

const Edit = (props) => {
    return (
        <Modal trigger={<button className="ui black basic inverted button" role="button">Edit</button>}>
            <Modal.Header>Update your profile.</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form onSubmit={props.handleRegister}>
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
                            <input name='picture'
                                value={props.picture} />
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
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default Edit;
