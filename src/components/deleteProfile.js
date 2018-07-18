import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

const Delete = (props) => {
    return (
        <Modal trigger={<button className="ui red basic button" role="button">Delete</button>}>
            <Modal.Header>Are you sure you want to delete your profile?</Modal.Header>
                <Modal.Description>
                    <Form onSubmit={(event) => props.handleDelete(event, props.userId)}>
                        <Button type="submit">I'm sure.</Button>
                    </Form>
                </Modal.Description>
        </Modal>
    )
}

export default Delete;

