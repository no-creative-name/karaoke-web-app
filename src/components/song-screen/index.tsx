import React, { useState, useEffect } from 'react';
import { PitchLine } from '../pitch-line';
import { LyricWord } from '../lyric-word';
import styled from 'styled-components';
import { TextPart } from '../../interfaces';

interface SongScreenProps {
    line: TextPart[];
    upcomingLines: TextPart[][];
    currentMs: number;
}

export const StyledSongScreen = styled.div`
    position: relative;
    width: 60vw;
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

export const SongScreen: React.FC<SongScreenProps> = ({ line, upcomingLines, currentMs }) => {
    const [lowestPitch, setLowestPitch] = useState<number>(0);
    const [highestPitch, setHighestPitch] = useState<number>(0);
    const [totalDuration, setTotalDuration] = useState<number>(0);

    useEffect(() => {
        const pitches = line.map(part => part.pitch);
        setLowestPitch(pitches.reduce((lowest, current) => current < lowest ? current : lowest, 0));
        setHighestPitch(pitches.reduce((highest, current) => current > highest ? current : highest, 0));

        let totalDuration = 0;

        line.forEach((part, index) => {
            if (index < line.length - 1) {
                totalDuration += part.durationMs + (line[index + 1].stampMs - part.stampMs + part.durationMs);
            } else {
                totalDuration += part.durationMs;
            }
        });

        setTotalDuration(totalDuration);
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
                {line.map((part, index) => <PitchLine
                    width={`${part.durationMs / totalDuration * 100}%`}
                    marginRight={line[index + 1] ? `${(line[index + 1].stampMs - part.stampMs + part.durationMs) / totalDuration * 100}%` : ''}
                    y={`${-((part.pitch - lowestPitch) / (highestPitch - lowestPitch) * 500)}%`}
                    percentage={`${getLinePercentage(part)}%`}
                    isSpoken={part.isSpoken}
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
                    {JSON.stringify(line) !== JSON.stringify(upcomingLines[0])
                        ? (upcomingLines[0] || []).map(part =>
                            <LyricWord
                                isPreview={true}>
                                {part.text}
                            </LyricWord>)
                        : (upcomingLines[1] || []).map(part =>
                            <LyricWord
                                isPreview={true}>
                                {part.text}
                            </LyricWord>)}
                </LyricLine>
            </LyricsWrapper>
        </StyledSongScreen>
    )
}