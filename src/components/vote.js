import React, { Component } from 'react';
import { Button, Modal, Divider, Form } from 'semantic-ui-react'
import { Bar } from 'react-chartjs-2';

import Edit from './editProfile'
import Delete from './deleteProfile'





export default class Vote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            voted: false,
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
        const abURL = `${votesURL}/${id}`
        const body = JSON.stringify({
            abVote: this.props.voteData[0].abVote + 1,
            votedAb: allVotes
        })
        fetch(abURL, {
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

        let yesVotes = vote.votedYes.length
        let noVotes = vote.votedNo.length
        let abVotes = vote.votedAb.length

        const data = {
            labels: ['Yes', 'No', 'Abstain'],
            datasets: [
                {
                    label: 'Vote Total',
                    backgroundColor: 'rgb(192, 178, 131, .3)',
                    borderColor: 'rgb(55, 55, 55, .3)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgb(192, 178, 131, 1)',
                    hoverBorderColor: 'rgb(55, 55, 55, 1)',
                    data: [yesVotes, noVotes, abVotes]
                }
            ]
        };

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    return (
            <Modal trigger={<span>{vote.name}</span>}>
                <Modal.Header>Issue #{vote.id}: {vote.name}</Modal.Header>
                <Modal.Content>
                    <h4>Created By: {vote.createdBy}</h4>
                    <h4>Opened On: {vote.openedOn.slice(0,10)}</h4>
                    <h4>Issue: {vote.issue}</h4>
                    <Divider />
                    {(!this.state.voted)
                    ?
                    <Modal.Actions>
                        <Button onClick={this.yesVote}>{vote.option1}</Button>
                        <Button onClick={this.noVote}>{vote.option2}</Button>
                        <Button onClick={this.abVote}>{vote.option3}</Button>
                    </Modal.Actions>
                    :
                    <div>
                    <h2>Thank you for voting!</h2>
                    <Bar    data={data}
                            width={100}
                            height={50} 
                            options={options} />
                    <h3>Yes votes: {vote.votedYes.join(', ')}</h3>
                    <h3>No votes: {vote.votedNo.join(', ')}</h3>
                    <h3>Abstained: {vote.votedAb.join(', ')}</h3>
                    </div>
                    }
                </Modal.Content>
            </Modal>
        )
    }
}
