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
import Challenges from './Containers/Challenges'

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
                <li className={'rightline'}><NavLink exact to="/">You</NavLink> </li>
                <li className={'rightline'}><NavLink to="/user">Compare</NavLink></li>
                  <li><NavLink to="/challenges">Challenges</NavLink></li>
              </ul>
              <div>
                <Route exact path="/" component={Home} />
                <Route path="/user" component={User} />
                  <Route path="/challenges" component={Challenges} />
              </div>
            </div>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
