import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart} from 'react-vis';
import '../App.css';

class Home extends Component {

    constructor() {
        super()
        this.state = {
            selectedCompare: '18-30',
        }
    }

    handleSelect = (e) => {
        this.setState({
            selectedCompare: e.target.value,
        })
    }

    render() {
        const myData = [{angle: 2, color: '#ec732f'}, {angle: 8, color: '#f88c20'}]
        const overallData = [{angle: 4, color: '#ec732f'}, {angle: 6, color: '#f88c20'}]
        const finlandData = [{angle: 6, color: '#ec732f'}, {angle: 4, color: '#f88c20'}]
        return (
            <div className="App">
                <header className="App-header">
                    <h2 className={'header'}>
                        ECOLOGRIC
                    </h2>
                </header>

                <div className="content">
                    <select className='dropdown' onChange={this.handleSelect}>
                        <option value="18-30">18-30</option>
                        <option value="Finland">Finland</option>
                    </select>
                    <div className="explanation-container">
                        <div className='square1'></div>
                        <p className='explanation-text' >Local food</p>
                    </div>
                    <div className="explanation-container">
                        <div className='square2'></div>
                        <p className='explanation-text'>Non local food</p>
                    </div>
                    <p>How you have eaten in last 30 days</p>
                    <RadialChart className={'chart'}
                                 data={myData}
                                 animation
                                 width={120}
                                 height={120}
                                 colorType={'literal'}
                                 showLabels={true}
                    />
                    <p>How your country has eaten in last 30 days</p>
                    <RadialChart className={'chart'}
                                 data={this.state.selectedCompare === '18-30' ? overallData : finlandData}
                                 animation
                                 width={250}
                                 height={250}
                                 colorType={'literal'}
                                 showLabels={true}
                    />
                </div>
            </div>
        )
    }
}

export default Home;
