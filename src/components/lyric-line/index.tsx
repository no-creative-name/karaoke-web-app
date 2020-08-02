import React from 'react';
import './styles.scss';

interface LyricLineProps {
    active: boolean;
}

export const LyricLine: React.FC<LyricLineProps> = ({ active, children }) => {
    return (
        <div className={`lyric-line ${active ? 'lyric-line--active' : ''}`}>
            {children}
        </div>
    )
}