import React, { Component } from 'react';
import { Button, Modal, Divider } from 'semantic-ui-react'
import { Bar } from 'react-chartjs-2';

const votesURL = 'https://bestboard-db.herokuapp.com/votes'

export default class Vote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            voted: false
        }
    }

    render() {
        let voteData = this.props.voteData
        let user = this.props.user.name
        if (!voteData) {
            return null
        }

        let voteModals = this.props.voteData.map(vote => {
            let yesVote = (event, id) => {
                event.preventDefault()
                id = vote.id
                let allVotes = vote.votedYes
                allVotes.push(user)
                const yesURL = `${this.votesURL}/${id}`
                const body = JSON.stringify({
                    yesVote: vote.yesVote + 1,
                    votedYes: allVotes
                })
                fetch(yesURL, {
                    method: "PUT",
                    headers: new Headers({ "content-type": "application/json" }),
                    body: body
                })
                    .then(this.setState({ voted: true }))
            }

            let noVote = (event, id) => {
                event.preventDefault()
                id = vote.id
                let allVotes = vote.votedNo
                allVotes.push(user)
                const noURL = `${this.votesURL}/${id}`
                const body = JSON.stringify({
                    noVote: vote.noVote + 1,
                    votedNo: allVotes
                })
                fetch(noURL, {
                    method: "PUT",
                    headers: new Headers({ "content-type": "application/json" }),
                    body: body
                })
                    .then(this.setState({ voted: true }))
            }

            let abVote = (event, id) => {
                event.preventDefault()
                id = vote.id
                let allVotes = vote.votedAb
                allVotes.push(user)
                const abURL = `${this.votesURL}/${id}`
                const body = JSON.stringify({
                    abVote: vote.abVote + 1,
                    votedAb: allVotes
                })
                fetch(abURL, {
                    method: "PUT",
                    headers: new Headers({ "content-type": "application/json" }),
                    body: body
                })
                    .then(this.setState({ voted: true }))
            }

            let yesVotes = vote.votedYes
            let noVotes = vote.votedNo
            let abVotes = vote.votedAb

            let history = yesVotes.concat(noVotes, abVotes)
            let user = this.props.user.name
            let userHasVoted = false

            let checkVote = () => {
                for (var i = 0; i <= history.length; i++) {
                    if (history[i] == user) {
                        userHasVoted = true
                    }
                }
            }
            checkVote()

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
                        data: [yesVotes.length, noVotes.length, abVotes.length]
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
                    <div className="voteContainer">
                        <Modal trigger={<span>{vote.name}</span>}>
                            <Modal.Header>Issue #{vote.id}: {vote.name}</Modal.Header>
                            <Modal.Content>
                                <h4>Created By: {vote.createdBy}</h4>
                                <h4>Opened On: {vote.openedOn.slice(0, 10)}</h4>
                                <h4>Issue: {vote.issue}</h4>
                                <Divider />
                                {(!userHasVoted)
                                    ?
                                    <Modal.Actions>
                                        <Button onClick={yesVote}>{vote.option1}</Button>
                                        <Button onClick={noVote}>{vote.option2}</Button>
                                        <Button onClick={abVote}>{vote.option3}</Button>
                                    </Modal.Actions>
                                    :
                                    <div>
                                        <h2>Thank you for voting!</h2>
                                        <Bar data={data}
                                            width={20}
                                            height={10}
                                            options={options} />
                                        <h3>Yes votes: {vote.votedYes.join(', ')}</h3>
                                        <h3>No votes: {vote.votedNo.join(', ')}</h3>
                                        <h3>Abstained: {vote.votedAb.join(', ')}</h3>
                                    </div>
                                }
                            </Modal.Content>
                        </Modal>
                    </div>
                )
            })

    return (

                <div>{voteModals.sort()}</div>

        )
    }
}
