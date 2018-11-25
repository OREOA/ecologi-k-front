import React, { Component } from 'react'
import './App.css'
import 'react-simple-dropdown/styles/Dropdown.css'
import {
    Route,
    BrowserRouter,
} from 'react-router-dom'
import Home from './Containers/Home'
import User from './Containers/User'
import Challenges from './Containers/Challenges'
import Header from './Containers/Header'
import Nav from './Containers/Nav'

class App extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Nav/>
                        <div>
                            <Route exact path="/" component={Home} />
                            <Route path="/user" component={User} />
                            <Route path="/challenges" component={Challenges} />
                        </div>
                        <div className="alamenu">
                            <p className={'munax-text'}>Munax.Io productions ltd. 2018</p>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App
