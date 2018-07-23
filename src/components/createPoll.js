import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

const createPoll = (props) => {
    return (
        <Modal trigger={<span>Create Poll</span>}>
            <Modal.Header>Fill out the information to create a poll.</Modal.Header>
            <Form onSubmit={props.handlePoll}>
                <Form.Field>
                    <label>Poll Title</label>
                    <input name='name' />
                </Form.Field>
                <Form.Field>
                    <label>Please provide a short description of the issue.</label>
                    <input name='issue' />
                </Form.Field>
                <Form.Field>
                    <label>How long will this poll remain open?</label>
                    <input name='closedOn' />
                </Form.Field>
            <Button type="submit">Submit</Button>
            </Form>
        </Modal>
    )
}

export default createPoll;
