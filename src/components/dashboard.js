import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react'
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkoutForm';

import Nav from './nav'
import Vote from './vote'
import Calendar from './calendar'
import Messages from './messages'

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
                                        Action Items
                                    </Divider>
                                    <ul>
                                        <li>Do this</li>
                                        <li>Do this</li>
                                        <li>Do this</li>
                                    </ul>
                                </div>
                                <div className="votes">
                                    <Divider horizontal>
                                        Open Polls
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
                        <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
                            <div className="example">
                                <h1>React Stripe Elements Example</h1>
                                <Elements>
                                    <CheckoutForm />
                                </Elements>
                            </div>
                        </StripeProvider>
                        <Calendar />
                    </div>
                </div>
            </div>
        )
    }
}
