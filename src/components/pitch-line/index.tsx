import React from 'react';
import './styles.scss';

interface PitchLineProps {
    width: string;
    y: string;
    percentage: string;
}

export const PitchLine: React.FC<PitchLineProps> = ({ width, y, percentage }) => {
    return (
        <div className="pitch-line" style={{width, transform: `translateY(${y})`}}>
            <span style={{width: percentage}}></span>
        </div>
    )
}