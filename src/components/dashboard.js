import React, { Component } from 'react';
import { Divider, Header, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Elements, StripeProvider } from 'react-stripe-elements';

import Nav from './nav'
import Vote from './vote'
import Calendar from './calendar'
import Messages from './messages'
import Payment from './payment'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.userData
                .filter(profile => profile.id == window.localStorage.userId)[0]
        }

    }

    componentDidMount() {
        const token = window.localStorage.token
        if (!token) {
            window.location.href = '/'
        }
    }

    render() {
        let profile = this.state.user
        if (!profile) {
            return null
        }

        return (
            <div>              
                <Nav    userData={this.props.userData}
                        user={this.state.user}
                        userId={this.props.userId}
                        loggedIn={this.props.loggedIn}
                        logOut={this.props.logOut}
                        handleDelete={this.props.handleDelete}
                        handleEdit={this.props.handleEdit}
                        handlePoll={this.props.handlePoll} />
                <div className="mainDash">
                    <div className="left">
                        <div className="upperLeft">
                            <div className="items">
                                <div className="tasks">
                                    <Divider horizontal>
                                        <Header className="sectionHead" as='h3'>Action Items</Header>
                                    </Divider>
                                    <div className="tasksList">                                        
                                        <div>
                                            <div>It looks like you haven't paid your yearly dues.</div>
                                            <div className="payButtons">
                                                <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
                                                    <Button.Group>
                                                        <Button className="bOr" basic color="green" size="tiny">
                                                            <Elements>
                                                                <Payment />
                                                            </Elements>
                                                        </Button>
                                                        <Button.Or />
                                                        <Button className="bOr" basic color="red" size="tiny">
                                                            Volunteer
                                                        </Button>
                                                    </Button.Group>
                                                </StripeProvider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="votes">
                                    <Divider horizontal>
                                        <Header className="sectionHead" as='h3'>Open Polls</Header>
                                    </Divider>
                                        <Vote   user={this.state.user}
                                                yesVote={this.props.yesVote}
                                                voteData={this.props.voteData} 
                                                getVotes={this.props.getVotes} />
                                </div>
                            </div>
                        </div>
                        <Messages activitiesData={this.props.activitiesData} />
                    </div>
                    <div className="right">
                        <Calendar />
                    </div>
                </div>
            </div>
        )
    }
}
