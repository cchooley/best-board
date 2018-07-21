import React, { Component } from 'react';
import { Divider, Menu, Dropdown, Button, Modal, Form } from 'semantic-ui-react'

import Admin from './editProfile'
import Delete from './deleteProfile'
import ProfileMenu from './profileMenu'

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edited: false,
            deleted: false
        }

    }
    
    render() {
        let profile = this.props.user
        if (!profile) {
            return null
        }
        
        return (
            <div className="userProfile">
                <Menu>
                    <Dropdown className="drop" pointing text='Categories'>
                        {
                            (this.props.user.role == "Admin")
                                ? <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Admin handleEdit={this.props.handleEdit}
                                            userId={this.props.userId}
                                            logOut={this.props.logOut} />
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <ProfileMenu profile={this.props.user} />
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Delete handleDelete={this.props.handleDelete}
                                            userId={this.props.userId}
                                            logOut={this.props.logOut} />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={this.props.logOut}>
                                        <span>Logout</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                                : <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <ProfileMenu profile={this.props.user} />
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Delete handleDelete={this.props.handleDelete}
                                            userId={this.props.userId}
                                            logOut={this.props.logOut} />
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                        }
                    </Dropdown>
                </Menu>
                <img src={profile.image} className='avatar' size='small' />
            </div>
        )
    }
}

