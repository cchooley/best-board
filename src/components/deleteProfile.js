import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

const Delete = (props) => {
    return (
        <Modal trigger={<span>Delete</span>} size='mini'>
            <Modal.Header>Do you want to delete your profile?</Modal.Header>
            <Modal.Content>Your profile cannot be recovered after deletion.</Modal.Content>
                <Modal.Content>
                    <Form onSubmit={(event) => props.handleDelete(event, window.localStorage.userId)}>
                        <Button type="submit">I'm sure.</Button>
                    </Form>
                </Modal.Content>
        </Modal>
    )
}

export default Delete;

