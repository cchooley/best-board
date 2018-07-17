import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

const Login = (props) => {
    return (
        <Modal trigger={<button className="ui yellow basic inverted button" primary>Login</button>}>
            <Modal.Header>Log in to your account</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <p>All fields required</p>
                    <Form onSubmit={props.handleLogin}>
                        <Form.Field>
                            <label>E-Mail Address</label>
                            <input  name='email'
                                    value={props.email}
                                    placeholder='Your E-Mail address' />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input  name='password'
                                    value={props.password}
                                    placeholder='Password'
                                    type='password' />
                        </Form.Field>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default Login