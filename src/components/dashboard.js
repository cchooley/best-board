import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react'

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
                                        <Header className="sectionHead" as='h3'>Action Items</Header>
                                    </Divider>
                                    <div className="tasksList">
                                        <div>Do this</div>
                                        <div>Do this</div>
                                        <div>Do this</div>
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
