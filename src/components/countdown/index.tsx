import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface CountdownProps {
    countFrom: number;
    onCountdownDone: () => void;
}

const CountdownNumber = styled.span`
    font-size: 100px;
`

export const Countdown: React.FC<CountdownProps> = ({ countFrom, onCountdownDone }) => {
    const [currentCount, setCurrentCount] = useState<number>(countFrom);

    useEffect(() => {
        setTimeout(() => {
            if (currentCount > 1) {
                setCurrentCount(currentCount - 1);
            } else {
                onCountdownDone();
            }
        }, 1000)
    }, [currentCount, onCountdownDone])

    return (
        <div>
            <CountdownNumber>{currentCount}</CountdownNumber>
        </div>
    )
}