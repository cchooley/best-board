import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button, Modal, Divider } from 'semantic-ui-react'


class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        let stripeURL = "https://bestboard-db.herokuapp.com/stripe/charge"
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        let response = await fetch(stripeURL, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: token.id
        });
        console.log(response)
        if (response.ok) this.setState({ complete: true })
    }

    render() {

        return (
            <Modal trigger={<span>Pay Dues</span>} size="tiny">
                <Modal.Header>Pay your yearly dues.</Modal.Header>
                <Modal.Content className="checkout">
                        <p>Would you like to pay your yearly dues?</p>
                        <p>Your card will be charged $250.</p>
                </Modal.Content>
                <Modal.Content>
                    <CardElement />
                </Modal.Content>
                { (!this.state.complete) 
                ? <Modal.Content>
                    <Button onClick={this.submit}>Send</Button>
                </Modal.Content>
                : <Modal.Content>
                    <h3>Success! Thank you for your payment.</h3>
                </Modal.Content> }
            </Modal>
        );
    }
}

export default injectStripe(Payment); 