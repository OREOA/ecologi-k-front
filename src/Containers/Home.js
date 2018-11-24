import React, { Component } from 'react';
import '../App.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart} from 'react-vis'
import { getStatisticsForOne, getProducts } from "../helpers/utils";
import { ClipLoader } from 'react-spinners';
import Header from './Header'

class Home extends Component {

    constructor(){
        super();
        this.state = {
            data: [{angle: 0}, {angle: 10, color: '#f88c20'}],
            ready: false,
        }
    }

    componentDidMount() {
        const that = this;
        getStatisticsForOne()
            .then(function (response) {
                // handle success
                console.log(response.data);
                const value = response.data * 10
                that.setState({
                    data: [{angle: value, color: '#ec732f', label: `${(value * 10).toFixed(1)}%`}, {angle: 10-value, color: '#f88c20'}],
                    ready: true,
                })
            })
            .catch(function (error) {
                this.setState = {
                    error: error,
                }
            })
            .then(function () {
                // always executed
            });

        getProducts()
            .then(function (response) {
                // handle success
                console.log(response);

            })
            .catch(function (error) {
                // handle error
                console.log('error', error)
            })
            .then(function () {
                // always executed
            });
    }

    render() {
        return (
            <div className="App">
                <div className="content">
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
