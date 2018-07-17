import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'


import Nav from './components/nav'
import Landing from './components/landing'
import Footer from './components/footer'
import Dashboard from './components/dashboard'

const loginURL = 'https://bestboard-db.herokuapp.com/auth/login'
const registerURL = 'https://bestboard-db.herokuapp.com/auth/register'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      loggedIn: false,
      userData: []
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
    const userURL = 'https://bestboard-db.herokuapp.com/users'
    fetch(userURL)
        .then(response => response.json())
        .then(data => {
            this.setState({
                userData: data.users
            })
        })
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
          window.localStorage.token = result.token
          let decode = jwtDecode(result.token)
          this.updateUserID(decode.userId)
          this.setState({
            loggedIn: true
          })
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
          window.localStorage.token = result.token
          let decode = jwtDecode(result.token)
          this.updateUserID(decode.userId)
          this.setState({
            loggedIn: true
          })
        } else {
          alert("This didn't work because:" + result.error)
        }
      })
  }

  render() {
    
    return (
      <BrowserRouter>
        <div className="App">
            <Switch>
              <Route exact path='/' component={() => 
                <Landing  
                  updateUserID={this.updateUserID} 
                  handleRegister={this.handleRegister}
                  handleLogin={this.handleLogin} />} />
              <Route exact path='/dashboard' component={() =>
                <Dashboard 
                  userData={this.state.userData}
                  updateUserID={this.updateUserID} 
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
