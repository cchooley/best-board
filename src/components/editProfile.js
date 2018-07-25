import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

class Edit extends Component {
    render() {
        return (
            <Modal trigger={<Button>Edit</Button>}>
                <Modal.Header>Update your profile.</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Form onSubmit={(event) => this.props.handleEdit2(event, this.props.id)}>
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
}

export default Edit