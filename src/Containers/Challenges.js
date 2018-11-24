import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart} from 'react-vis';

class Challenges extends Component {
    render() {
        const myData = [{angle: 1, color: '#ec732f'}, {angle: 5, color: '#f88c20'}]
        return (
            <div className="App">
                <header className="App-header">
                    <h2 className={'subheader'}>
                        Challenges
                    </h2>
                </header>
                <div className="content">
                    <p>Guidelines and challenges to track your enviromental process</p>
                  <ul className='challenges-list'>
                      <li className={'underline'}>Vegan-Week <img className='checkMark' src={require('../resources/greencheck.png')} /></li>
                      <li className={'underline'}>Month Straight Local Food</li>
                      <li>3 months without plastic bags</li>
                  </ul>
                </div>
            </div>
        );
    }
}

export default Challenges;
