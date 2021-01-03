import React, { useState, useEffect } from 'react';
import { SongInfo, SongLine, TextLine } from '../../helpers/analyze-song';
import { SongPart } from '../../components/song-part';
import { convertMsToStamp } from '../../helpers/convert-ms-to-stamp';
import { useHistory } from 'react-router-dom';
import { Countdown } from '../../components/countdown';
import { getStartIndexOfLineGroup } from '../../helpers/get-start-index-of-line-group';
import { getEndIndexOfLineGroup } from '../../helpers/get-end-index-of-line-group';
import { getFirstTextLineBefore } from '../../helpers/get-first-text-line-before';
import { getIndexOfFirstLineAfter } from '../../helpers/get-index-of-first-line-after';

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
            setInterval(() => setCurrentMs((new Date()).getTime()), 1);
        }
    }, [levelStarted]);

    const getCurrentLines = (lines: SongLine[], ms: number): TextLine[] => {
        const firstLineIndex = getIndexOfFirstLineAfter(lines, convertMsToStamp(ms, songInfo.bpm));
        const firstTextLineIndex = getFirstTextLineBefore(lines, firstLineIndex);

        const startIdx = getStartIndexOfLineGroup(lines, firstTextLineIndex);
        const endIdx = getEndIndexOfLineGroup(lines, firstTextLineIndex);

        return lines.slice(startIdx, endIdx + 1) as TextLine[];
    }

    return (
        <React.Fragment>
            {
                !levelStarted
                    ? <Countdown
                        countFrom={3}
                        onCountdownDone={() => setLevelStarted(true)}>
                    </Countdown>
                    : <SongPart
                        lines={getCurrentLines(songInfo.lines, (currentMs - startMs))}
                        nextLines={getCurrentLines(songInfo.lines, (currentMs - startMs) + 500)}
                        currentMs={(currentMs - startMs)}>
                    </SongPart>
            }

            <button onClick={() => history.push('/')}>Back to Menu</button>
        </React.Fragment>
    )
}