import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button, Modal, Form } from 'semantic-ui-react'

// class Success extends Component {
//     state = { open: false }

//     open = () => this.setState({ open: true })
//     close = () => this.setState({ open: false })

//     render() {
//         const { open } = this.state

//         return (
//             <Modal
//                 open={open}
//                 onOpen={this.open}
//                 onClose={this.close}
//                 size='small'>
//                 <Modal.Header>Success!</Modal.Header>
//                 <Modal.Content>
//                     <p>Your card was successfully charged. Thank you!</p>
//                 </Modal.Content>
//                 <Modal.Actions>
//                     <Button icon='check' content='All Done' onClick={this.close} />
//                 </Modal.Actions>
//             </Modal>
//         )
//     }
// }

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
            <Modal trigger={<span>Payment</span>}>
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