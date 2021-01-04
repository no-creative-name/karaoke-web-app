import React, { useState, useEffect } from 'react';
import { SongScreen } from '../../components/song-screen';
import { convertMsToStamp } from '../../helpers/convert-ms-to-stamp';
import { useHistory } from 'react-router-dom';
import { Countdown } from '../../components/countdown';
import { getStartIndexOfLine } from '../../helpers/get-start-index-of-line';
import { getEndIndexOfLine } from '../../helpers/get-end-index-of-line';
import { getFirstTextPartBefore } from '../../helpers/get-first-text-part-before';
import { getIndexOfFirstPartAfter } from '../../helpers/get-index-of-first-part-after';
import { SongInfo, SongPart, TextPart } from '../../interfaces';
import { AbsoluteButton } from '../../components/absolute-button';
import { getUpcomingLines } from '../../helpers/get-upcoming-lines';

interface LevelProps {
    songInfo: SongInfo;
}

export const Level: React.FC<LevelProps> = ({ songInfo }) => {
    const [startMs, setStartMs] = useState<number>(0);
    const [currentMs, setCurrentMs] = useState<number>(0);
    const [levelStarted, setLevelStarted] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        if (levelStarted) {
            setStartMs((new Date()).getTime());
            setInterval(() => setCurrentMs((new Date()).getTime()), 5);
        }
    }, [levelStarted]);

    const getCurrentLine = (line: SongPart[], ms: number): TextPart[] => {
        const firstLineIndex = getIndexOfFirstPartAfter(line, convertMsToStamp(ms, songInfo.bpm));
        const firstTextLineIndex = getFirstTextPartBefore(line, firstLineIndex);

        const startIdx = getStartIndexOfLine(line, firstTextLineIndex);
        const endIdx = getEndIndexOfLine(line, firstTextLineIndex);

        return line.slice(startIdx, endIdx + 1) as TextPart[];
    }

    return (
        <React.Fragment>
            {
                !levelStarted
                    ? <Countdown
                        countFrom={3}
                        onCountdownDone={() => setLevelStarted(true)}>
                    </Countdown>
                    : <SongScreen
                        line={getCurrentLine(songInfo.parts, (currentMs - startMs))}
                        upcomingLines={getUpcomingLines(songInfo.parts, (currentMs - startMs), 2000) || []}
                        currentMs={(currentMs - startMs)}>
                    </SongScreen>
            }

            <AbsoluteButton onClick={() => history.push('/')}>Back to Menu</AbsoluteButton>
        </React.Fragment>
    )
}