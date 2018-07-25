import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from "moment";

import 'react-datepicker/dist/react-datepicker.css';

class createPoll extends Component {
    constructor (props) {
        super(props)
        this.state = {
            openDate: moment(),
            closeDate: moment(),
        }
        this.handleOpenChange = this.handleOpenChange.bind(this)
        this.handleCloseChange = this.handleCloseChange.bind(this)
    }

    handleOpenChange(date) {
        this.setState({
            openDate: date
        })
    }

    handleCloseChange(date) {
        this.setState({
            closeDate: date
        })
    }

    render() {
        return (
                <Modal trigger={<span>Create Poll</span>}>
                    <Modal.Header>Fill out the information to create a poll.</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={this.props.handlePoll}>
                        <Form.Field>
                            <label>Poll Title</label>
                            <input name='name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Please provide a short description of the issue.</label>
                            <input name='issue' />
                        </Form.Field>
                        <div className="datePickerContainer">
                            <Form.Field>
                                <label>When will this poll open?</label>
                                <DatePicker name='openedOn'
                                    selected={this.state.openDate}
                                    onChange={this.handleOpenChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>How long will this poll remain open?</label>
                                <DatePicker name='closedOn' 
                                            selected={this.state.closeDate}
                                            onChange={this.handleCloseChange} />
                            </Form.Field>
                        </div>
                    <Button type="submit">Submit</Button>
                    </Form>
                    </Modal.Content>
                </Modal>
            )
        }
}

export default createPoll