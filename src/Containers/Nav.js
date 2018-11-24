import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'

class Nav extends Component {

    render() {
        return (
            <div className="menu">
                <Dropdown>
                    <DropdownTrigger>
                        <svg height="28px" width="28px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" fill="#cc3524">
                            <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"/>
                        </svg>
                    </DropdownTrigger>
                    <DropdownContent>
                        <ul>
                            <li><NavLink exact to="/">You</NavLink></li>
                            <li><NavLink to="/user">Compare</NavLink></li>
                            <li><NavLink to="/challenges">Challenges</NavLink></li>
                        </ul>
                    </DropdownContent>
                </Dropdown>
                <p className={'junction-text'}>Junction 2018</p>
            </div>
        )
    }
}

export default Nav
