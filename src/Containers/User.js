import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart} from 'react-vis';
import Header from './Header'

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

    onMouseOver = () => {
        
    }

    render() {
        const myData = [{angle: 2, color: '#ec732f'}, {angle: 8, color: '#f88c20'}]
        const overallData = [{angle: 4, color: '#ec732f'}, {angle: 6, color: '#f88c20'}]
        const finlandData = [{angle: 6, color: '#F0F66E'}, {angle: 4, color: '#f88c20'}]
        return (
            <div className="App">
                <div className="content">
                    <div className={'card'}>
                        <p>How you have eaten in last 30 days</p>
                        <RadialChart className={'chart'}
                                     data={myData}
                                     animation
                                     width={180}
                                     height={180}
                                     colorType={'literal'}
                                     showLabels={true}
                                     onValueMouseOver={this.onMouseOver}
                        />
                        <div className={'explanations'}>
                            <div className="explanation-container">
                                <div className='square1'></div>
                                <p className='explanation-text' >Local food</p>
                            </div>
                            <div className="explanation-container">
                                <div className='square2'></div>
                                <p className='explanation-text'>Non local food</p>
                            </div>
                        </div>

                    </div>
                    <div className={'card'}>
                        <p>Select comparable group</p>
                        <select className='dropdown' onChange={this.handleSelect}>
                            <option value="18-30">18-30</option>
                            <option value="Finland">Finland</option>
                        </select>
                    <RadialChart className={'chart'}
                                 data={this.state.selectedCompare === '18-30' ? overallData : finlandData}
                                 animation
                                 width={250}
                                 height={250}
                                 colorType={'literal'}
                                 showLabels={true}
                    />
                        <div className={'explanations'}>
                            <div className="explanation-container">
                                <div className='square1'></div>
                                <p className='explanation-text' >Local food</p>
                            </div>
                            <div className="explanation-container">
                                <div className='square2'></div>
                                <p className='explanation-text'>Non local food</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
