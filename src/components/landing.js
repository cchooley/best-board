import React from 'react';
import { Button } from 'semantic-ui-react'

const Landing = (props) => {
    return (
        <div class="mainLand">
            <div class="innerLand">
                <h2>Get in motion.</h2>
                <h3>Welcome to BestBoard, the number one new app for managing productivity for non-profit B-O-Ds.</h3>
                <h3>Create your own account or login below.</h3>
                <div class="landButton">
                    <Button primary>Register</Button>
                    <Button secondary>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Landing;
