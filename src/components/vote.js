import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

import Edit from './editProfile'
import Delete from './deleteProfile'


export default class Vote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            voted: false
        }
    }

    yesVote = (event, id) => {
        const votesURL = 'https://bestboard-db.herokuapp.com/votes'
        event.preventDefault()
        id = this.props.voteData[0].id
        let allVotes = this.props.voteData[0].votedYes
        allVotes.push(this.props.user.name)
        const yesURL = `${votesURL}/${id}`
        const body = JSON.stringify({
            yesVote: this.props.voteData[0].yesVote +1,
            votedYes: allVotes
        })
        fetch(yesURL, {
            method: "PUT",
            headers: new Headers({ "content-type": "application/json" }),
            body: body
        })
        .then(this.setState ({ voted: true }))
        }

    noVote = (event, id) => {
        const votesURL = 'https://bestboard-db.herokuapp.com/votes'
        event.preventDefault()
        id = this.props.voteData[0].id
        let allVotes = this.props.voteData[0].votedNo
        allVotes.push(this.props.user.name)
        const noURL = `${votesURL}/${id}`
        const body = JSON.stringify({
            noVote: this.props.voteData[0].noVote + 1,
            votedNo: allVotes
        })
        fetch(noURL, {
            method: "PUT",
            headers: new Headers({ "content-type": "application/json" }),
            body: body
        })
            .then(this.setState({ voted: true }))
    }
    
    abVote = (event, id) => {
        const votesURL = 'https://bestboard-db.herokuapp.com/votes'
        event.preventDefault()
        id = this.props.voteData[0].id
        let allVotes = this.props.voteData[0].votedAb
        allVotes.push(this.props.user.name)
        const noURL = `${votesURL}/${id}`
        const body = JSON.stringify({
            abVote: this.props.voteData[0].abVote + 1,
            votedNo: allVotes
        })
        fetch(noURL, {
            method: "PUT",
            headers: new Headers({ "content-type": "application/json" }),
            body: body
        })
            .then(this.setState({ voted: true }))
    }

    render() {
        let vote = this.props.voteData[0]
        if(!vote) {
            return null
        }
    return (
            <Modal trigger={<span>{vote.name}</span>}>
                <Modal.Header>Issue #{vote.id}: {vote.name}</Modal.Header>
                <Modal.Content>
                    <h4>Created By: {vote.createdBy}</h4>
                    <h4>Opened On: {vote.openedOn.slice(0,10)}</h4>
                    <h4>Issue: {vote.issue}</h4>
                    {(!this.state.voted)
                    ?
                    <Modal.Actions>
                        <Button onClick={this.yesVote}>{vote.option1}</Button>
                        <Button onClick={this.noVote}>{vote.option2}</Button>
                        <Button onClick={this.abVote}>{vote.option3}</Button>
                    </Modal.Actions>
                    :
                    <h2>Thank you for voting!</h2>
                    }
                </Modal.Content>
            </Modal>
        )
    }
}
