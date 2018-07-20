import React, { Component } from 'react';
import { Divider, Menu, Dropdown, Button, Modal, Form } from 'semantic-ui-react'

import Admin from './editProfile'
import Delete from './deleteProfile'
import ProfileMenu from './profileMenu'

const loginURL = 'https://bestboard-db.herokuapp.com/auth/login'
const registerURL = 'https://bestboard-db.herokuapp.com/auth/register'

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

        const token = window.localStorage.token
        return (
            <div className="sideNav">
                <Divider horizontal>Profile</Divider>
                <div className="userProfile">
                    <img src={profile.image} className='avatar' size='medium' />
                    <div className="stats">
                        <span>{profile.name}</span>
                        <span>{profile.role}</span>
                        <span>{profile.organization}</span>
                        <span>{profile.email}</span>
                    </div>
                </div>
                <div className="menuContainer">
                    <Menu vertical>
                        <Dropdown item text='Categories'>
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
                </div>
            </div>
        )
    }
}

