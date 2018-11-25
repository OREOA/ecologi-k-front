import React, { Component } from 'react'
import { getChallenges, getChallengeResults } from '../helpers/utils'
import Collapsible from 'react-collapsible'

class Challenges extends Component {

    constructor() {
        super()
        this.state = {
            challenges: [{
                id: '5bf9b6c38673062e3af5efdf',
                name: 'Domestic for the win',
                description: '75% of your purchases are domestic products',
                goal: 75,
            },
            {
                id: 'wuroghli34i8galal38ral83',
                name: 'Embrace fair-trade',
                description: 'Only buy fair-trade products from the outside of EU-region',
                goal: 30,
            }, {
                id: '5bf9b7ab82f24c2e93e2e77a',
                name: 'Meatless month',
                description: 'Don\'t buy any meat products this month',
                goal: 30,
            }],
            results: [{
                challenge: {
                    id: '5bf9b6c38673062e3af5efdf',
                },
                value: 75,
            }, {
                challenge: {
                    id: '5bf9b7ab82f24c2e93e2e77a',
                },
                value: 24,
            }, {
                challenge: {
                    id: 'wuroghli34i8galal38ral83',
                },
                value: 0,
            }],
        }
    }

    componentDidMount() {
        // getChallenges()
        //     .then(({ data }) => {
        //         this.setState({
        //             challenges: data,
        //         })
        //     })
        // getChallengeResults()
        //     .then(({ data }) => {
        //         this.setState({
        //             results: data,
        //         })
        //     })
    }

    render() {
        const { challenges, results } = this.state
        return (
            <div className="App">
                <div className="content">
                    <h3>Challenge yourself!</h3>
                    <p>Guidelines and challenges to track your environmental process</p>
                    <div className="Challenge_container">
                        {challenges.map((c) => {
                            const result = results.find((r) => r.challenge.id === c.id)
                            const resultValue = (result && result.value) || 0
                            const progress = resultValue / c.goal
                            return (
                                <div key={c.id} className="card Challenge_card">
                                    <Collapsible
                                        trigger={(
                                            <p className="Challenge_title">
                                                {c.name}
                                                {progress >= 0.99 && (
                                                    <div className="Challenge_card_checkmark_container">
                                                        <img src={require('../resources/greencheck.png')} />
                                                    </div>
                                                )}
                                                {progress > 0 && progress < 1 && (
                                                    <div className="Challenge_card_progress_container">
                                                        <img src={require('../resources/Pacman.svg')} />
                                                    </div>
                                                )}
                                                {progress === 0 && (
                                                    <div className="Challenge_card_new_container">
                                                        <p>new!</p>
                                                    </div>
                                                )}
                                            </p>
                                        )} transitionTime={200}
                                    >
                                        <p>{c.description}</p>
                                        <p className="Challenge_card_footer">
                                            Progress: {(progress * 100).toFixed(0)}%
                                        </p>
                                    </Collapsible>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Challenges
