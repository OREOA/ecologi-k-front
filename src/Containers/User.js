import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart} from 'react-vis';
import Header from './Header'
import { getStatisticsForAll, getStatisticsForAgeGroup, getEuStatisticsForAll, getEuStatisticsForAgeGroup } from "../helpers/utils";

class Home extends Component {

    constructor() {
        super()
        this.state = {
            selectedCompare: '18-24',
            ageGroupData: [],
            allData: [],
            ready: false,
        }
    }

    componentDidMount() {
        this.initializeAllStats();
    }


    initializeAllStats = () => {
        this.getStatsForAll();
        this.getStatsForAgeGroup('18-24')
    }


    getStatsForAll = () => {
        const that = this;
        let value = null;
        getStatisticsForAll()
            .then(function (response) {
                value = response.data * 10
                getEuStatisticsForAll()
                    .then(function (response) {
                        let euvalue = response.data * 10;
                        console.log(euvalue)
                        let restvalue = 10 - euvalue - value;
                        let data = []
                        data.push({angle: value, color: '#ec732f'}, {angle: euvalue, color: '#ff8500'}, {angle: restvalue, color: '#ffa600' })
                        that.setState({
                            allData: data,
                            ready: true,
                        })

                    })
                    .catch(function (error) {

                    })

            })
            .catch(function (error) {

            })

    }

    getStatsForAgeGroup = (age) => {
        const that = this;
        let value = null;
        getStatisticsForAgeGroup(age)
            .then(function (response) {
                value = response.data * 10
                getEuStatisticsForAgeGroup(age)
                    .then(function (response) {
                        let euvalue = response.data * 10;
                        console.log(euvalue)
                        let restvalue = 10 - euvalue - value;
                        let data = []
                        data.push({angle: value, color: '#ec732f'}, {angle: euvalue, color: '#ff8500'}, {angle: restvalue, color: '#ffa600' })
                        that.setState({
                            ageGroupData: data,
                            ready: true,
                        })

                    })
                    .catch(function (error) {

                    })

            })
            .catch(function (error) {

            })

    }



    handleSelect = (e) => {
        this.setState({
            selectedCompare: e.target.value,
        }, this.getStatsForAgeGroup(e.target.value))
    }


    render() {
        const myData = [{angle: 0.2, color: '#ec732f'}, {angle: 8, color: '#f88c20'}]
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
                            <option value="18-24">18-24</option>
                            <option value="25-34">25-34</option>
                            <option value="35-44">35-44</option>
                            <option value="45-54">45-54</option>
                            <option value="Finland">Finland</option>
                        </select>
                        {this.state.allData.length > 1 && this.state.ageGroupData.length > 1 && (
                            <div>
                            <RadialChart className={'chart'}
                                         data={this.state.selectedCompare === 'Finland' ? this.state.allData : this.state.ageGroupData}
                                         animation
                                         width={250}
                                         height={250}
                                         colorType={'literal'}
                                         showLabels={true}
                            />
                            </div>

                        )}
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
