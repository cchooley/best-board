import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import Nav from './components/nav'
import Landing from './components/landing'
import Footer from './components/footer'

const loginURL = 'bestboard-db.herokuapp.com/auth/login'
const userURL = 'bestboard-db.herokuapp.com/users'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: []
    }
  }

  /*
  componentDidMount() {
    this.getUsers()
  }
  */

  handleSubmit = (loginData) => {
    console.log(loginData)
    fetch(loginURL, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(loginData)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
  }

  /*
  getUsers = () => {
    fetch(userURL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          userData: data.users
        })
      })
  }
  */

  render() {
    return (
      <div className="App">
        <Nav data={this.state.userData} />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
