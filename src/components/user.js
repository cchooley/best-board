import React, { Component } from 'react';
import { Divider, Menu, Dropdown, Button, Modal, Form } from 'semantic-ui-react'

import Edit from './editProfile'
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
                <img src={profile.image} className='avatar' size='medium' />
                <h4>{profile.name}</h4>
                <h5>{profile.role}</h5>
                <h5>{profile.organization}</h5>
                <h5>{profile.email}</h5>
                <div className="udContainer">
                    <Menu vertical>
                        <Dropdown item text='Categories'>
                            <Dropdown.Menu>
                                {
                                    (this.props.user.role == "Admin")
                                    ? <Dropdown.Item>
                                        <Edit handleEdit={this.props.handleEdit}
                                            userId={this.props.userId}
                                            logOut={this.props.logOut} />
                                    </Dropdown.Item>
                                    : <Dropdown.Item>
                                        <ProfileMenu />
                                    </Dropdown.Item>
                                }
                                <Dropdown.Item>
                                    <Delete handleDelete={this.props.handleDelete}
                                        userId={this.props.userId}
                                        logOut={this.props.logOut} />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu>
                    {/* <ProfileMenu    handleEdit={this.props.handleEdit}
                                                userId={this.props.userId}
                                                handleDelete={this.props.handleDelete}
                                                logOut={this.props.logOut} /> */}
                </div>
            </div>
        )
    }
}

