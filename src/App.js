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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
