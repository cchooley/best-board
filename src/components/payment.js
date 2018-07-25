import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button, Modal, Form } from 'semantic-ui-react'

class Payment extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        let stripeURL = "https://bestboard-db.herokuapp.com/stripe"
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        let response = await fetch(stripeURL, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: token.id
        });

        if (response.ok) console.log("Purchase Complete!")
    }


    render() {
        return (
            <Modal trigger={<span>Payment Processing</span>}>
                <Modal.Header>Pay yearly dues or donate.</Modal.Header>
                <Modal.Content>
                    <div className="checkout">
                        <p>Would you like to complete the purchase?</p>
                        <CardElement />
                        <button onClick={this.submit}>Send</button>
                    </div>
                </Modal.Content>
            </Modal>
        );
    }
}

export default injectStripe(Payment); 