import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

const Register = (props) => {
    return (
        <Modal trigger={<button className="ui blue basic inverted button" role="button">Register</button>}>
            <Modal.Header>Let's get you signed up.</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <p>Fill out the form below (all fields required) to sign up for a BestBoard account.</p>
                    <p>All fields required</p>
                    <Form onSubmit={props.handleRegister}>
                        <Form.Field>
                            <label>Name</label>
                            <input  name='name'
                                    value={props.name}  />
                        </Form.Field>
                        <Form.Field>
                            <label>E-Mail Address</label>
                            <input  name='email'
                                    value={props.email} />
                        </Form.Field>
                        <Form.Field>
                            <label>Organization</label>
                            <input  name='organization'
                                    value={props.organization}  />
                        </Form.Field>
                        <Form.Field>
                            <label>Role in Organization</label>
                            <input  name='role'
                                    value={props.role}  />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input  name='password'
                                    value={props.password}
                                    type='password'  />
                        </Form.Field>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default Register;
