import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <div className={'titlecontainer'}>
                    <h2 className={'header'}>
                        ECOLOGI-
                    </h2>
                    <img className='headerlogo' src={require('../resources/kesko.png')} />
                </div>
            </header>
        );
    }
}

export default Header;
