import React from 'react';

import Register from './register'
import Login from './login'

const Landing = (props) => {
    return (
        <div class="mainLand">
            <div class="innerLand">
                <h2 class="big gold">Get in motion.</h2>
                <h3>Welcome to <span class="gold">BestBoard</span>, the number one new app for managing productivity in non-profit governance.</h3>
                <h3>Create your own account or login below.</h3>
                <div class="landButton">
                    <Register />
                    <Login />
                </div>
            </div>
        </div>

    )
}

export default Landing;