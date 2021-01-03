import React, { useState, useEffect } from 'react';
import { SongInfo, SongLine, TextLine } from '../../helpers/analyze-song';
import { SongPart } from '../../components/song-part';
import { convertMsToStamp } from '../../helpers/convert-ms-to-stamp';
import { useHistory } from 'react-router-dom';
import { Countdown } from '../../components/countdown';

interface LevelProps {
    songInfo: SongInfo;
}

export const Level: React.FC<LevelProps> = ({ songInfo }) => {
    const [startMs, setStartMs] = useState<number>(0);
    const [currentMs, setCurrentMs] = useState<number>(0);
    const [levelStarted, setLevelStarted] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        if(levelStarted) {
            setStartMs((new Date()).getTime());
            setInterval(() => setCurrentMs((new Date()).getTime()), 1);
        }
    }, [levelStarted]);

    const getCurrentLines = (lines: SongLine[], ms: number): TextLine[] => {
        let lineIdx: number | undefined = undefined;
        lines.forEach((line, idx) => {
            if (line.stamp >= convertMsToStamp(ms, songInfo.bpm)) {
                for (let i = idx; i > 0; i--) {
                    if (lines[i].type === 'text' && !lineIdx) {
                        lineIdx = i;
                    }
                }
            }
        });

        let firstLineIdx: number | undefined = undefined;
        let lastLineIdx: number | undefined = undefined;

        if (lineIdx) {
            for (let i = lineIdx; i <= lines.length - 2; i++) {
                if (lines[i + 1].type === 'pause' && !lastLineIdx) {
                    lastLineIdx = i + 1;
                }
            }
            for (let i = lineIdx; i > 0; i--) {
                if ((lines[i - 1].type === 'pause' && !firstLineIdx)) {
                    firstLineIdx = i;
                }
                else if (i >= 1 && !firstLineIdx) {
                    firstLineIdx = 0;
                }
            }
        }

        if (firstLineIdx !== undefined && lastLineIdx !== undefined) {
            return lines.slice(firstLineIdx, lastLineIdx) as TextLine[];
        } else {
            return [];
        }
    }

    return (
        <React.Fragment>
            {
                !levelStarted ? <Countdown countFrom={3} onCountdownDone={() => setLevelStarted(true)}></Countdown> : <SongPart lines={getCurrentLines(songInfo.lines, (currentMs - startMs))} nextLines={getCurrentLines(songInfo.lines, (currentMs - startMs) + 500)} currentMs={(currentMs - startMs)}></SongPart>
            }

            <button onClick={() => history.push('/')}>Back to Menu</button>
        </React.Fragment>
    )
}