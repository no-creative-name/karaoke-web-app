import React from 'react';
import './styles.scss';

interface LyricLineProps {
    active?: boolean;
    preview?: boolean;
}

export const LyricLine: React.FC<LyricLineProps> = ({ active, preview, children }) => {
    return (
        <div className={`lyric-line ${active ? 'lyric-line--active' : ''} ${preview ? 'lyric-line--preview' : ''}`}>
            {children}
        </div>
    )
}