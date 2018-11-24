import React, { Component } from 'react';
import '../App.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart} from 'react-vis'
import { getStatisticsForOne, getEuStatisticsForOne } from "../helpers/utils";
import { ClipLoader } from 'react-spinners';
import Header from './Header'

class Home extends Component {

    constructor(){
        super();
        this.state = {
            data: [],
            ready: false,
        }
    }

    componentDidMount() {
        this.initializeChartData()
    }

    initializeChartData = () => {
        this.getDomesticStatsForOne();
        this.getEuStatsForOne();
    }

    getDomesticStatsForOne = () => {
        const that = this;
        getStatisticsForOne()
            .then(function (response) {
                // handle success
                const value = response.data * 10
                const data = that.state.data;
                data.push({angle: value, color: '#ec732f'})
                that.setState({
                    data: data,
                })
            })
            .catch(function (error) {
                this.setState = {
                    error: error,
                }
            })

    }

    getEuStatsForOne = () => {
        const that = this;
        getEuStatisticsForOne()
            .then(function (response) {
                // handle success
                const value = response.data * 10
                const data = that.state.data;
                const firstval = data[0].angle
                const restval = 10-value-firstval;
                data.push({angle: value, color: '#ff8500'}, {angle: restval, color: '#ffa600'})
                that.setState({
                    data: data,
                    ready: true,
                })
            })
            .catch(function (error) {
                that.setState = {
                    error: error,
                }
            })

    }

    render() {
        return (
            <div className="App">
                <div className="content">
                    <h3>Rapacione productions limited</h3>
                    <p>How you have eaten in last 30 days</p>
                    {this.state.data !== null && (
                        <div className={'card'}>
                            <ClipLoader
                                className={'spinner'}
                                sizeUnit={"px"}
                                size={30}
                                color={'#561125'}
                                loading={!this.state.ready}
                            />
                            <p>Your eating</p>
                            <RadialChart
                                className={'chart'}
                                data={this.state.data}
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
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
