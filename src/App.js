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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      userData: [],
      loggedIn: false
    }
  }

  componentDidMount() {
    this.getUsers()
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
          this.setState({loggedIn: true})
          window.localStorage.token = result.token
          let decode = jwtDecode(result.token)
          window.localStorage.userId = decode.userId
          this.updateUserID(decode.userId)
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
      password: formData.get("password")
    })
    fetch(registerURL, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: body
    })
      .then(response => response.json())
      .then(result => {
        if (result.token) {
          this.setState({ loggedIn: true })
          window.localStorage.token = result.token
          let decode = jwtDecode(result.token)
          window.localStorage.userId = decode.userId
          this.updateUserID(decode.userId)
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
    console.log(editURL)
    const body = JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      image: formData.get("image"),
      organization: formData.get("organization"),
      role: formData.get("role"),
    })
    console.log(body)
    fetch(editURL, {
      method: "PUT",
      headers: new Headers({ "content-type": "application/json" }),
      body: body
    })
    .then({ "message": "success" })

  }

  handleDelete = (event, id) => {
    event.preventDefault()
    id = window.localStorage.userId
    const deleteURL = `${usersURL}/${id}`
    console.log(deleteURL)
    fetch(deleteURL, {
      method: "DELETE",
      headers: new Headers({ "content-type": "application/json" })
    })
      .then(delete window.localStorage.token)
      .then(delete window.localStorage.userId)
      .then(this.setState({loggedIn: false}))
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
                  handleLogin={this.handleLogin} />} />
              <Route exact path='/dashboard' component={() =>
                <Dashboard 
                  loggedIn={this.state.loggedIn}
                  userData={this.state.userData}
                  edited={this.state.edited}
                  updateUserID={this.updateUserID} 
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                  logOut={this.logOut}
                  getUsers={this.getUsers}  
                  userId={this.state.userId}/>} />
            </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
