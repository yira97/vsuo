import React, { useState } from 'react';
import { REFRESH_ITN, Point } from '../helper';
import { useInterval, useEvent, useMouse } from 'react-use';

const Stage = ({ running, game, updateScore }) => {

    const [frame, setFrame] = useState(0)
    const main_canva = React.useRef(null)
    const [fired, setFired] = useState(false)

    const clear_main_canva = (ctx) => {
        ctx.clearRect(0, 0, game.stageWidth, game.stageHeight)
    }

    const mouseRef = React.useRef(null);
    const { docX, docY } = useMouse(mouseRef)

    useInterval(() => {
        if (!running) {
            return;
        }
        game.updateMousePosition(new Point(docX, docY))
        if (fired) {
            game.fire();
            setFired(false)
        }
        game.tick();
        setFrame(frame + 1)
    }, REFRESH_ITN)

    React.useEffect(() => {
        let canva = main_canva.current
        if (!canva) return

        let ctx = canva.getContext('2d')
        if (!ctx) return

        if (!running) {
            return;
        }
        clear_main_canva(ctx)
        game.draw(ctx)
        updateScore(game.stat().score)
    }, [frame])

    useEvent('click', (e) => {
        // todo: cd
        setFired(true)
    })

    return (
        <div className="GameStage" style={{ height: game.stageHeight, width: game.stageWidth }} ref={mouseRef}>
            <canvas id='main' ref={main_canva} height={game.stageHeight} width={game.stageWidth}></canvas>
        </div>
    )
}

export default Stage