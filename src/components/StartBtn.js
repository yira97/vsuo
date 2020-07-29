import React from 'react';
import { Button } from 'antd';

const StartBtn = ({ callback }) => {
    return (
        <Button onClick={callback}>开始游戏</Button>
    )
}

export default StartBtn