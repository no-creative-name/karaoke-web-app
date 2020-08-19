import React, { useState, useEffect } from 'react';
import './styles.scss';
import { TextLine } from "../../helpers/analyze-song";
import { PitchLine } from '../pitch-line';
import { LyricLine } from '../lyric-line';

interface SongPartProps {
    lines: TextLine[];
    nextLines: TextLine[];
    currentMs: number;
}

export const SongPart: React.FC<SongPartProps> = ({ lines, nextLines, currentMs }) => {
    const [lowestPitch, setLowestPitch] = useState<number>(0);
    const [highestPitch, setHighestPitch] = useState<number>(0);
    const [totalDuration, setTotalDuration] = useState<number>(0);

    useEffect(() => {
        if (lines.length) {
            const pitches = lines.map(line => line.pitch);
            const durations = lines.map(line => line.durationMs);
            setLowestPitch(pitches.reduce((lowest, current) => current < lowest ? current : lowest));
            setHighestPitch(pitches.reduce((highest, current) => current > highest ? current : highest));
            setTotalDuration(durations.reduce((duration, current) => current));
        }

    }, [lines]);

    const getLinePercentage = (line: TextLine): number => {
        if (line.stampMs <= currentMs && line.stampMs + line.durationMs >= currentMs) {
            return (currentMs - line.stampMs) / line.durationMs * 100;
        } else if (line.stampMs > currentMs) {
            return 0;
        } else {
            return 100;
        }
    }

    return (
        <div className="song-part">
            <div className="song-part__pitches">
                {lines.map(line => <PitchLine width={`${line.durationMs / totalDuration * 100}%`} y={`${-((line.pitch - lowestPitch) / (highestPitch - lowestPitch) * 500)}%`} percentage={`${getLinePercentage(line)}%`}></PitchLine>)}
            </div>
            <div className="song-part__lyrics">
                <div className="song-part__activeLyrics">
                    {lines.map(line => <LyricLine active={getLinePercentage(line) > 0}>{line.text}</LyricLine>)}
                </div>
                <div className="song-part__previewLyrics">
                    {JSON.stringify(lines) !== JSON.stringify(nextLines) ? nextLines.map(line => <LyricLine preview={true}>{line.text}</LyricLine>) : ''}
                </div>
            </div>
        </div>
    )
}