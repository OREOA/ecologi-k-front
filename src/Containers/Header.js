import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <div className={'titlecontainer'}>
                    <span className={'header'}>
                        ECOLOGI-
                    </span>
                    <img className='headerlogo' src={require('../resources/logo-k.svg')} />
                </div>
            </header>
        );
    }
}

export default Header;
