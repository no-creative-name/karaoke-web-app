import React, { useState, useEffect } from 'react';
import { TextLine } from "../../helpers/analyze-song";
import { PitchLine } from '../pitch-line';
import { LyricLine } from '../lyric-line';
import styled from 'styled-components';

interface SongPartProps {
    lines: TextLine[];
    nextLines: TextLine[];
    currentMs: number;
}

export const StyledSongPart = styled.div`
    position: relative;
    height: 100vh;
    padding: 0 10%;
`

export const PitchesWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 80%;
`

export const LyricsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const LyricsGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    > *:not(:first-child) {
        margin-left: 10px;
    }
`

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
            setTotalDuration(durations.reduce((duration, current) => duration + current));
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
        <StyledSongPart>
            <PitchesWrapper>
                {lines.map(line => <PitchLine width={`${line.durationMs / totalDuration * 100}%`} y={`${-((line.pitch - lowestPitch) / (highestPitch - lowestPitch) * 500)}%`} percentage={`${getLinePercentage(line)}%`}></PitchLine>)}
            </PitchesWrapper>
            <LyricsWrapper>
                <LyricsGroup>
                    {lines.map(line => <LyricLine isActive={getLinePercentage(line) > 0}>{line.text}</LyricLine>)}
                </LyricsGroup>
                <LyricsGroup>
                    {JSON.stringify(lines) !== JSON.stringify(nextLines) ? nextLines.map(line => <LyricLine isPreview={true}>{line.text}</LyricLine>) : ''}
                </LyricsGroup>
            </LyricsWrapper>
        </StyledSongPart>
    )
}