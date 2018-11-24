import React, { Component } from 'react';
import '../App.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart} from 'react-vis';

class Home extends Component {
    render() {
        const myData = [{angle: 1, color: '#ec732f'}, {angle: 5, color: '#f88c20'}]
        return (
            <div className="App">
                <header className="App-header">
                    <h2 className={'header'}>
                        ECOLOGRIC
                    </h2>
                </header>
                <div className="content">
                    <p>How you have eaten in last 30 days</p>
                    <div className="explanation-container">
                        <div className='square1'></div>
                        <p className='explanation-text' >Local food</p>
                    </div>
                    <div className="explanation-container">
                        <div className='square2'></div>
                        <p className='explanation-text'>Non local food</p>
                    </div>
                <RadialChart className={'chart'}
                    data={myData}
                    width={250}
                    height={250}
                    colorType={'literal'}
                    showLabels={true}
                />
                </div>
            </div>
        );
    }
}

export default Home;
