import React from 'react';
import { Button } from 'semantic-ui-react'

const Nav = (props) => {
    return (
        <header>
            <div>
                <h1 class="ui header">First Header</h1>
                <h2 class="ui header">Second Header</h2>
                <h3 class="ui header">Third Header</h3>
                <h4 class="ui header">Fourth Header</h4>
                <h5 class="ui header">Fifth Header</h5>
                <h6 class="ui header">Sixth Header</h6>
            </div>
            <div>
                <Button primary>Primary</Button>
                <Button secondary>Secondary</Button>
            </div>
        </header>
    )
}

export default Nav;
