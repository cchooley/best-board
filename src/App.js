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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      userData: [],
      loggedIn: false,
      voteData: []
    }
  }

  componentDidMount() {
    this.getUsers()
    this.getVotes()
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
      organization: formData.get("organization"),
      role: formData.get("role"),
      password: formData.get("password"),
      committees: formData.get('committees')
    })
    fetch(registerURL, {
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
          alert("This didn't work because:" + result.error)
        }
      })
  }

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
      .then(delete window.localStorage.userId)
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
                  handleRegister={this.handleRegister}
                  handleLogin={this.handleLogin}
                  userId={this.state.userId} />} />
              <Route exact path='/dashboard' component={() =>
                <Dashboard 
                  loggedIn={this.state.loggedIn}
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
