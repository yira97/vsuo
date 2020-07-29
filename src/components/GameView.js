import React, { useState } from 'react';

import Stage from './Stage'
import Display from './Display';
import StartBtn from './StartBtn';
import { GAME_CONFIG } from '../helper';
import { Game } from '../game';
import { Row, Col } from 'antd';



const GameView = () => {
    const [game] = useState(new Game(GAME_CONFIG))
    const [running, setrunning] = useState(false)
    const [score, setscore] = useState(0)

    const gameStart = () => {
        setrunning(true)
        console.log("game started.")
        game.new_round()
    }

    const gameStop = () => {
        setrunning(false)
    }

    return (
        <>
            <Row gutter={16}>
                <Col>
                    <Stage game={game} running={running} updateScore={setscore} />
                </Col>
                <Col>
                    <Display label={'得分'} text={score} />
                    <StartBtn callback={gameStart} />
                </Col>
            </Row>
        </>
    )
}

export default GameView;