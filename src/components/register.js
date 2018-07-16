import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

const Register = (props) => {
    return (
        <Modal trigger={<Button primary>Register</Button>}>
            <Modal.Header>Let's get you signed up.</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <p>Fill out the form below (all fields required) to sign up for a BestBoard account.</p>
                    <p>All fields required</p>
                    <Form >
                        <Form.Field>
                            <label>Name</label>
                            <input />
                        </Form.Field>
                        <Form.Field>
                            <label>E-Mail Address</label>
                            <input />
                        </Form.Field>
                        <Form.Field>
                            <label>Organization</label>
                            <input />
                        </Form.Field>
                        <Form.Field>
                            <label>Role in Organization</label>
                            <input />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input />
                        </Form.Field>
                        <Button onClick={props.handleSubmit} type="submit">Submit</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default Register;
