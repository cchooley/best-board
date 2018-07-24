import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'
import FocusTrap from 'focus-trap-react';

class Edit extends Component {
    constructor(props){
        super(props)
        this.state = {
            openModal: false,
            activeTrap: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.unmountTrap = this.unmountTrap.bind(this);
    }

    handleOpen() {
        this.setState({
            modalOpen: true,
            activeTrap: true
        });
    }

    handleClose() {
        this.setState({
            modalOpen: false,
            activeTrap: false
        });
    }

    unmountTrap() {
        if (this.state.activeTrap) {
            this.setState({ activeTrap: false });
        }
    }

    render() {

        return (
            <Modal  trigger={<span>Edit</span>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    size='large'
                    role='dialog'
                    id='edit'>

                <FocusTrap
                    id='focus-trap-exampleModal'
                    className="header"
                    active={this.state.activeTrap}
                    focusTrapOptions={{
                        onDeactivate: this.unmountTrap,
                        clickOutsideDeactivates: true,
                        initialFocus: '#firstElement',
                    }}>

                    <Modal.Header>Update your profile.</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Form onSubmit={(event) => this.props.handleAdmin(event, window.localStorage.userId)}>
                                <Form.Field id="firstElement">
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
                </FocusTrap>
            </Modal>
        )
    }
}

export default Edit;