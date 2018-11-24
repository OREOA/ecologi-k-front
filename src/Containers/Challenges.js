import React, { Component } from 'react';
import { getChallenges, getChallengeResults } from '../helpers/utils'
import Header from './Header'
import Collapsible from 'react-collapsible'

class Challenges extends Component {

    constructor() {
        super()
        this.state = {
            challenges: [{
                id: 'foo',
                title: 'Vegan-Week',
                description: '',
            }, {
                id: 'bar',
                title: 'Month Straight Local Food',
                description: '',
            }, {
                id: 'bah',
                title: '3 months without plastic bags',
                description: '',
            }],
            results: [],
        }
    }

    componentDidMount() {
        getChallenges()
            .then(({ data }) => {
                this.setState({
                    challenges: data,
                })
            })
        getChallengeResults()
            .then(({ data }) => {
                this.setState({
                    results: data,
                })
            })
    }

    render() {
        const { challenges } = this.state
        return (
            <div className="App">
                <div className="content">
                    <p>Guidelines and challenges to track your environmental process</p>
                    {challenges.map((c) => (
                        <Collapsible trigger={c.title}>
                            <p>Lorem ipsum dolor sit amet</p>
                        </Collapsible>
                    ))}
                </div>
            </div>
        );
    }
}

export default Challenges;
