import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import Landing from './components/landing'
import Footer from './components/footer'
import Dashboard from './components/dashboard'

const loginURL = 'https://bestboard-db.herokuapp.com/auth/login'
const registerURL = 'https://bestboard-db.herokuapp.com/auth/register'
const usersURL = 'https://bestboard-db.herokuapp.com/users'
const votesURL = 'https://bestboard-db.herokuapp.com/votes'
const activitiesURL = 'https://bestboard-db.herokuapp.com/activities'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      userData: [],
      loggedIn: false,
      voteData: [],
      deleted: false,
      edited: false,
      activitiesData: []
    }
  }

  componentDidMount() {
    this.getUsers()
    this.getVotes()
    this.getActivities()
  }

  updateUserID = (userId) => {
    this.setState({
      userId
    })
  }

  getUsers() {
    fetch(usersURL)
        .then(response => response.json())
        .then(data => {
            this.setState({
                userData: data.users
            })
        })
  }
  
  getVotes() {
    fetch(votesURL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          voteData: data.votes
        })
      })
  }

  getActivities() {
    fetch(activitiesURL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          activitiesData: data.activities
        })
      })
  }

  logIn = () => {
    this.setState({loggedIn: true})
  }

  logOut = () => {
    this.setState({loggedIn: false})
    delete window.localStorage.token
    delete window.localStorage.userId
  }

  handleLogin = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const body = JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password")
    })
    fetch(loginURL, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: body
    })
      .then(response => response.json())
      .then(result => {
        if (result.token) {
          let decode = jwtDecode(result.token)
          this.updateUserID(decode.userId)
          window.localStorage.token = result.token
          window.localStorage.userId = decode.userId
          this.setState({ loggedIn: true })
        } else {
          alert(result.error)
        }
      })
  }

  handleRegister = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const body = JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      image: 'https://tinyurl.com/yc7ytv5u',
      organization: formData.get("organization"),
      role: formData.get("role"),
      password: formData.get("password")
    })
    const body2 = JSON.stringify({
      createdBy: formData.get("name"),
      image: 'https://tinyurl.com/yc7ytv5u',
      openedOn: new Date(),
      activity: 'created a profile'
    })
    fetch(activitiesURL, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: body2
    }).then(response => response.json())
      .then(() => {
        fetch(registerURL, {
          method: "POST",
          headers: new Headers({ "content-type": "application/json" }),
          body: body
        }).then(response => response.json())
          .then(response => {
            if (response.token) {
              let decode = jwtDecode(response.token)
              this.updateUserID(decode.userId)
              window.localStorage.token = response.token
              window.localStorage.userId = decode.userId
            } else {
              alert("This didn't work because:" + response.error)
            }
          }).then(this.setState({ loggedIn: true }))
      }
    )}

  handleEdit = (event, id) => {
    event.preventDefault()
    id = window.localStorage.userId
    const editURL = `${usersURL}/${id}`
    const formData = new FormData(event.target)
    const body = JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      image: formData.get("image"),
      organization: formData.get("organization"),
      role: formData.get("role"),
    })
    fetch(editURL, {
      method: "PUT",
      headers: new Headers({ "content-type": "application/json" }),
      body: body
    })
    .then(this.setState ({ edited: true }))

  }

  handleDelete = (event, id) => {
    event.preventDefault()
    id = window.localStorage.userId
    const deleteURL = `${usersURL}/${id}`
    fetch(deleteURL, {
      method: "DELETE",
      headers: new Headers({ "content-type": "application/json" })
    })
    .then(delete window.localStorage.token)
    .then(this.setState({ deleted: true }))
  }

  render() {
    
    return (
      <BrowserRouter>
        <div className="App">
          
            <Switch>
              <Route exact path='/' component={() => 
                <Landing  
                  loggedIn={this.state.loggedIn}
                  updateUserID={this.updateUserID} 
                  handleActivity={this.handleActivity}
                  handleRegister={this.handleRegister}
                  handleLogin={this.handleLogin}
                  userId={this.state.userId} />} />
              <Route exact path='/dashboard' component={() =>
                <Dashboard 
                  loggedIn={this.state.loggedIn}
                  activitiesData={this.state.activitiesData}
                  userData={this.state.userData}
                  voteData={this.state.voteData} 
                  edited={this.state.edited}
                  updateUserID={this.updateUserID} 
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                  handlePoll={this.handlePoll}
                  logOut={this.logOut}
                  getUsers={this.getUsers}  
                  getVotes={this.getVotes} 
                  userId={this.state.userId} />} />
            </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
