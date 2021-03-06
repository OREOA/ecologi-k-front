import React, { Component } from 'react';
import { RadialChart} from 'react-vis';
import { ClipLoader } from 'react-spinners';
import { getStatisticsForAll, getStatisticsForAgeGroup, getEuStatisticsForAll, getEuStatisticsForAgeGroup, getEuStatisticsForOne, getStatisticsForOne } from "../helpers/utils";

class Home extends Component {

    constructor() {
        super()
        this.state = {
            selectedCompare: '18-24',
            ageGroupData: [],
            allData: [],
            data: [],
            ready: false,
        }
    }

    componentDidMount() {
        this.initializeAllStats();
    }


    initializeAllStats = () => {
        this.getDomesticStatsForOne();
        this.getEuStatsForOne();
        this.getStatsForAll();
        this.getStatsForAgeGroup('35-44')
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
                })
            })
            .catch(function (error) {
                that.setState = {
                    error: error,
                }
            })

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
                        })

                    })
                    .catch(function (error) {
                        console.log(error)
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
                        console.log(error)
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
                        <p>Your purchases over the last month</p>
                        <RadialChart className={'chart'}
                                     data={this.state.data}
                                     animation
                                     width={180}
                                     height={180}
                                     colorType={'literal'}
                                     showLabels={true}
                        />

                        {this.state.data !== null && this.state.ready && (
                            <div className={'explanations'}>
                                <p className={'explanation-title'}>Origin region</p>
                                <div className="explanation-container">
                                    <div className='square1'></div>
                                    <p className='explanation-text'>Domestic {(this.state.data[0].angle*10).toFixed(1)} %</p>
                                </div>
                                <div className="explanation-container">
                                    <div className='square2'></div>
                                    <p className='explanation-text'>Eu-region {(this.state.data[1].angle*10).toFixed(1)} %</p>
                                </div>
                                <div className="explanation-container">
                                    <div className='square3'></div>
                                    <p className='explanation-text'>Rest of the world {(this.state.data[2].angle*10).toFixed(1)} %</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={'card'}>
                        <ClipLoader
                            className={'spinner'}
                            sizeUnit={"px"}
                            size={30}
                            color={'#561125'}
                            loading={!this.state.ready}
                        />
                        {this.state.allData.length > 1 && this.state.ageGroupData.length > 1 && (
                            <div>
                                <p>Select comparision group</p>
                                <select className='dropdown' onChange={this.handleSelect}>
                                    <option value="18-24">Ages 18-24</option>
                                    <option value="25-34">Ages 25-34</option>
                                    <option value="35-44">Ages 35-44</option>
                                    <option value="45-54">Ages 45-54</option>
                                    <option value="55-64">Ages 55-64</option>
                                    <option value="65-">Ages 65 --></option>
                                    <option value="Finland">Finland</option>
                                </select>
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

                        {this.state.selectedCompare !== 'Finland' && this.state.ageGroupData !== null &&  this.state.ready && (
                            <div className={'explanations'}>
                                {console.log(this.state.ageGroupData)}
                                <p className={'explanation-title'}>Origin region</p>
                                <div className="explanation-container">
                                    <div className='square1'></div>
                                    <p className='explanation-text'>Domestic {(this.state.ageGroupData[0].angle*10).toFixed(1)} %</p>
                                </div>
                                <div className="explanation-container">
                                    <div className='square2'></div>
                                    <p className='explanation-text'>Eu-region {(this.state.ageGroupData[1].angle*10).toFixed(1)} %</p>
                                </div>
                                <div className="explanation-container">
                                    <div className='square3'></div>
                                    <p className='explanation-text'>Rest of the world {(this.state.ageGroupData[2].angle*10).toFixed(1)} %</p>
                                </div>
                            </div>
                        )}

                        {this.state.selectedCompare == 'Finland' && this.state.allData !== null && this.state.ready && (
                            <div className={'explanations'}>
                                <p className={'explanation-title'}>Origin region</p>
                                <div className="explanation-container">
                                    <div className='square1'></div>
                                    <p className='explanation-text'>Domestic {(this.state.allData[0].angle*10).toFixed(1)} % </p>
                                </div>
                                <div className="explanation-container">
                                    <div className='square2'></div>
                                    <p className='explanation-text'>Eu-region {(this.state.allData[1].angle*10).toFixed(1)} %</p>
                                </div>
                                <div className="explanation-container">
                                    <div className='square3'></div>
                                    <p className='explanation-text'>Rest of the world {(this.state.allData[2].angle*10).toFixed(1)} %</p>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
