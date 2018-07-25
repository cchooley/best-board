import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button, Modal, Form } from 'semantic-ui-react'


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
        if (this.state.complete) return <Modal.Content>Success!</Modal.Content>;

        return (
            <Modal trigger={<span>Payment</span>} size="tiny">
                <Modal.Header>Pay yearly dues or donate.</Modal.Header>
                <Modal.Content className="checkout">
                        <p>Would you like to complete the purchase?</p>
                        <CardElement />
                </Modal.Content>
                <Modal.Content>
                    <Button onClick={this.submit}>Send</Button>
                </Modal.Content>
            </Modal>
        );
    }
}

export default injectStripe(Payment); 