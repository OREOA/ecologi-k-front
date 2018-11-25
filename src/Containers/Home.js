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


class Home extends Component {

    constructor(){
        super();
        this.state = {
            data: [],
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
        this.setState({
            showModal: !this.state.showModal,
            showvalue: e,
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
                            <p>Your purchases over the last month</p>


                            <div className={'chartcontainer'}>
                            <img className={'arrow-left'} src={require('../resources/arrow.svg')} />

                            <RadialChart
                                className={'chart'}
                                data={this.state.data}
                                animation
                                width={250}
                                height={250}
                                colorType={'literal'}
                                onValueClick = {this.handleTouch}
                            />

                            <img className={'arrow-right'} src={require('../resources/arrow.svg')} />
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
                            <div className={'explanations'}>
                                <p className={'explanation-title'}>Origin region</p>
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
                    <div className={'info'}>
                        <h3>Why all of this matters</h3>
                        <p className={'breadtext'}>
                            The location where food is produced correlates a lot with the responsibility and
                            healthiness of the food. Usually close by produced food has smaller effects of
                            environment,is more pure and is more certainly produced in responsibly way.
                        </p>
                    </div>

                    <LineSeries
                        color="#FF9833"
                        className="dashed-example-line"
                        data={[{x: 0, y: 25}, {x: 30, y: 25}]}
                    />
                </div>
            </div>
        );
    }
}
//TEKSTI:
//The location where food is produced correlates a lot with the responsibility and healthiness of the food. Usually close by produced food has smaller effects of environment, is more pure and is more certainly produced in responsibly way.
export default Home;
