import React, { Component } from 'react';
import '../App.css';
import { RadialChart, XYPlot, VerticalBarSeries} from 'react-vis'
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
                that.setState = {
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
        const barData = [
            { "y": 100, "x": "Jan" },
            { "y": 112, "x": "Feb" },
            { "y": 230, "x": "Mar" },
            { "y": 268, "x": "Apr" },
            { "y": 300, "x": "May" },
            { "y": 310, "x": "Jun" },
            { "y": 315, "x": "Jul" },
            { "y": 340, "x": "Aug" },
            { "y": 388, "x": "Sep" },
            { "y": 404, "x": "Oct" },
            { "y": 442, "x": "Nov" },
            { "y": 447, "x": "Dec" }
        ]
        const chartWidth = 800;
        const chartHeight = 500;
        const chartDomain = [0, chartHeight];
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
                                <p>Origin of the food</p>
                                <div className="explanation-container">
                                    <div className='square1'></div>
                                    <p className='explanation-text'>Domestic</p>
                                </div>
                                <div className="explanation-container">
                                    <div className='square2'></div>
                                    <p className='explanation-text'>Eu-region</p>
                                </div>
                                <div className="explanation-container">
                                    <div className='square3'></div>
                                    <p className='explanation-text'>Rest of the world</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <XYPlot
                        xType="ordinal"
                        width={chartWidth}
                        height={chartHeight}
                        yDomain={chartDomain}
                    >
                        <VerticalBarSeries
                            data={barData}
                        />
                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default Home;
