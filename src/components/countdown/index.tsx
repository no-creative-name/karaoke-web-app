import React, { useEffect, useState } from 'react';

interface CountdownProps {
    countFrom: number;
    onCountdownDone: () => void;
}

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
            <span>{currentCount}</span>
        </div>
    )
}