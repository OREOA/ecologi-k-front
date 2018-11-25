import React, { Component } from 'react';
import '../App.css';
import { RadialChart, LineSeries} from 'react-vis'
import { getStatisticsForOne, getEuStatisticsForOne } from "../helpers/utils";
import { ClipLoader } from 'react-spinners';
import Header from './Header'
import Modal from 'react-modal';


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

const mockData = {
    '1': [{angle: 2.1820719950979122, color: "#ec732f", label: 2.1820719950979122, subLabel: "Domestic"}, {angle: 1.149347970552952, color: "#ff8500", label: 1.149347970552952, subLabel: "Eu-region"}, {angle: 6.6685800343491355, color: "#ffa600", label: 6.6685800343491355, subLabel: "Rest of the world"}],
    '2': [{angle: 3.2820719950979122, color: "#ec732f", label: 3.2820719950979122, subLabel: "Domestic"}, {angle: 3.049347970552952, color: "#ff8500", label: 3.049347970552952, subLabel: "Eu-region"}, {angle: 3.6685800343491355, color: "#ffa600", label: 3.6685800343491355, subLabel: "Rest of the world"}],
    '3': [{angle: 2.7620719950979122, color: "#ec732f", label: 2.7620719950979122, subLabel: "Domestic"}, {angle: 0.959347970552952, color: "#ff8500", label: 0.959347970552952, subLabel: "Eu-region"}, {angle: 6.278580034349136, color: "#ffa600", label: 6.278580034349136, subLabel: "Rest of the world"}],
    '4': [{angle: 2.0620719950979122, color: "#ec732f", label: 2.0620719950979122, subLabel: "Domestic"}, {angle: 1.549347970552952, color: "#ff8500", label: 1.549347970552952, subLabel: "Eu-region"}, {angle: 6.388580034349136, color: "#ffa600", label: 6.388580034349136, subLabel: "Rest of the world"}],
    '5': [{angle: 0.5820719950979122, color: "#ec732f", label: 0.5820719950979122, subLabel: "Domestic"}, {angle: 2.749347970552951, color: "#ff8500", label: 2.749347970552951, subLabel: "Eu-region"}, {angle: 6.6685800343491366, color: "#ffa600", label: 6.6685800343491366, subLabel: "Rest of the world"}],
}

const bestDomesticScore = mockData[2][0].label

const monthMap = {
    '0': 'November',
    '1': 'October',
    '2': 'September',
    '3': 'August',
    '4': 'July',
    '5': 'June',
}

class Home extends Component {

    constructor(){
        super();
        this.state = {
            data: [],
            spaghetti: 0,
            month: monthMap[0],
            ready: false,
            showModal: false,
            showvalue: null,
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
                data.push({angle: value, color: '#ec732f', label: value, subLabel: 'Domestic'})
                mockData['0'] = data
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
                data.push({angle: value, color: '#ff8500', label: value, subLabel: 'Eu-region'}, {angle: restval, color: '#ffa600', label: restval,  subLabel: 'Rest of the world'})
                mockData['0'] = data
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

    handleTouch = (e) => {
        console.log(e)
        console.log("-------------------------")
        console.log(this.state.data)
        console.log(this.state.dataMap)
        console.log("-------------------------")
        this.setState({
            showModal: !this.state.showModal,
            showvalue: e,
        })
    }

    changeMonthBack = () => {
        const newSpaghetti = this.state.spaghetti + 1
        this.setState({
            spaghetti: newSpaghetti,
            data: mockData[newSpaghetti],
            month: monthMap[newSpaghetti],
        })
    }

    changeMonthNext = () => {
        const newSpaghetti = this.state.spaghetti - 1
        this.setState({
            spaghetti: newSpaghetti,
            data: mockData[newSpaghetti],
            month: monthMap[newSpaghetti],
        })
    }

    render() {
        const barData = [
            { "y":100, "x": "Jan" },
            { "y": 100, "x": "Feb" },
            { "y": 30, "x": "Mar" },
            { "y":100, "x": "Apr" },
            { "y": 60, "x": "May" },
            { "y": 40, "x": "Jun" },
            { "y": 70, "x": "Jul" },
            { "y": 70, "x": "Aug" },
            { "y": 80, "x": "Sep" },
            { "y": 30, "x": "Oct" },
            { "y": 20, "x": "Nov" },
            { "y": 50, "x": "Dec" }
        ]
        const chartWidth = 350;
        const chartHeight = 200;
        const chartDomain = [0, chartHeight];
        return (
            <div className="App">
                <div className="content">
                    <h3>Origin of your purchases</h3>
                    <p className={'breadtext'}>Domestic and local goods - the healthy and ecological choice</p>
                    {this.state.data !== null && (
                        <div className={'card'}>
                            <ClipLoader
                                className={'spinner'}
                                sizeUnit={"px"}
                                size={30}
                                color={'#561125'}
                                loading={!this.state.ready}
                            />
                            <p>Your purchases in {this.state.month} </p>

                            <div className={'chartcontainer'}>
                                    <div className='arrowContainer'>
                                        {this.state.spaghetti<5 && (
                                            <img onClick={this.changeMonthBack} className={'arrow-left'} src={require('../resources/arrow.svg')} />
                                        )}
                                    </div>
                            <RadialChart
                                className={'chart'}
                                data={this.state.data}
                                animation
                                width={250}
                                height={250}
                                colorType={'literal'}
                                onValueClick = {this.handleTouch}
                            />


                                <div className='arrowContainer'>
                                    {this.state.spaghetti > 0 &&(
                                        <img onClick={this.changeMonthNext} className={'arrow-right'} src={require('../resources/arrow.svg')} />
                                    )}
                                </div>
                            </div>
                            <Modal
                                isOpen={this.state.showModal}
                                contentLabel="Example Modal"
                                style={customStyles}
                            >
                                <button className={'modalbutton'} onClick={this.handleTouch}>close</button>
                                <div>
                                    {this.state.showvalue && this.state.showModal && (
                                        <p>{this.state.showvalue.subLabel}: {(this.state.showvalue.label*10).toFixed(1)} %</p>
                                    )}
                                </div>
                            </Modal>
                            {this.state.data && this.state.ready && (
                                <div className={'explanations'}>
                                    <p className={'explanation-title'}>Origin region</p>
                                    <div className="explanation-container">
                                        <div className='square1'></div>
                                        <p className='explanation-text'>Domestic {(this.state.data[0].label*10).toFixed(1)} %</p>
                                    </div>
                                    <div className="explanation-container">
                                        <div className='square2'></div>
                                        <p className='explanation-text'>Eu-region {(this.state.data[1].label*10).toFixed(1)} %</p>
                                    </div>
                                    <div className="explanation-container">
                                        <div className='square3'></div>
                                        <p className='explanation-text'>Rest of the world {(this.state.data[2].label*10).toFixed(1)} %</p>
                                    </div>
                                </div>
                            )}
                            <p>Your best domestic score: {(bestDomesticScore*10).toFixed(1)} % </p>
                        </div>
                    )}
                    <div className={'info'}>
                        <h3>Why all of this matters</h3>
                        <p className={'breadtext'}>
                            The location where food is produced correlates a lot with the responsibility and
                            healthiness of the food. Usually close by produced food has smaller effects of
                            environment,is more pure and is more certainly produced in responsibly way.
                        </p>
                    </div>

                </div>
            </div>
        );
    }
}
//TEKSTI:
//The location where food is produced correlates a lot with the responsibility and healthiness of the food. Usually close by produced food has smaller effects of environment, is more pure and is more certainly produced in responsibly way.
export default Home;
