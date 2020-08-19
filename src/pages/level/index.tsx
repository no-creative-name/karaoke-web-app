import React from 'react';
import { SongInfo, SongLine, TextLine } from '../../helpers/analyze-song';
import { SongPart } from '../../components/song-part';
import { convertMsToStamp } from '../../helpers/convert-ms-to-stamp';

interface LevelProps {
    songInfo: SongInfo;
    currentMs: number;
}

export const Level: React.FC<LevelProps> = ({ songInfo, currentMs }) => {

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
        <SongPart lines={getCurrentLines(songInfo.lines, currentMs)} nextLines={getCurrentLines(songInfo.lines, currentMs + 500)} currentMs={currentMs}></SongPart>
    )
}