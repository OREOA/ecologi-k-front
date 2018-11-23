import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Home from './Containers/Home'
import User from './Containers/User'

class App extends Component {


  componentDidMount(){

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <div>
              <ul className="menu">
                <li><NavLink exact to="/">Home</NavLink> </li>
                <li><NavLink to="/user">User</NavLink></li>
              </ul>
              <div className="content">
                <Route exact path="/" component={Home} />
                <Route path="/user" component={User} />
              </div>
            </div>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
