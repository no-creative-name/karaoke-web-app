import React, { useState, useEffect } from 'react';
import { PitchLine } from '../pitch-line';
import { LyricWord } from '../lyric-word';
import styled from 'styled-components';
import { TextPart } from '../../interfaces';

interface SongScreenProps {
    line: TextPart[];
    nextLine: TextPart[];
    currentMs: number;
}

export const StyledSongScreen = styled.div`
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

export const LyricLine = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    > *:not(:first-child) {
        margin-left: 10px;
    }
`

export const SongScreen: React.FC<SongScreenProps> = ({ line, nextLine, currentMs }) => {
    const [lowestPitch, setLowestPitch] = useState<number>(0);
    const [highestPitch, setHighestPitch] = useState<number>(0);
    const [totalDuration, setTotalDuration] = useState<number>(0);

    useEffect(() => {
        if (line.length) {
            const pitches = line.map(part => part.pitch);
            const durations = line.map(part => part.durationMs);
            setLowestPitch(pitches.reduce((lowest, current) => current < lowest ? current : lowest));
            setHighestPitch(pitches.reduce((highest, current) => current > highest ? current : highest));
            setTotalDuration(durations.reduce((duration, current) => duration + current));
        }

    }, [line]);

    const getLinePercentage = (textPart: TextPart): number => {
        if (textPart.stampMs <= currentMs && textPart.stampMs + textPart.durationMs >= currentMs) {
            return (currentMs - textPart.stampMs) / textPart.durationMs * 100;
        } else if (textPart.stampMs > currentMs) {
            return 0;
        } else {
            return 100;
        }
    }

    return (
        <StyledSongScreen>
            <PitchesWrapper>
                {line.map(part =>
                    <PitchLine
                        width={`${part.durationMs / totalDuration * 100}%`}
                        y={`${-((part.pitch - lowestPitch) / (highestPitch - lowestPitch) * 500)}%`}
                        percentage={`${getLinePercentage(part)}%`}
                    ></PitchLine>)}
            </PitchesWrapper>
            <LyricsWrapper>
                <LyricLine>
                    {line.map(part =>
                        <LyricWord
                            isActive={getLinePercentage(part) > 0}
                        >
                            {part.text}
                        </LyricWord>)}
                </LyricLine>
                <LyricLine>
                    {JSON.stringify(line) !== JSON.stringify(nextLine)
                        ? nextLine.map(line =>
                            <LyricWord isPreview={true}>{line.text}</LyricWord>)
                        : ''}
                </LyricLine>
            </LyricsWrapper>
        </StyledSongScreen>
    )
}