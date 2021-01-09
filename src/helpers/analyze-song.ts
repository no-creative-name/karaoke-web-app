import { SongInfo } from '../interfaces';
import { convertMsToStamp } from './convert-ms-to-stamp';
import { convertStampToMs } from './convert-stamp-to-ms';
import { parseForMainInfo } from './parse-for-main-info';
import { parseTextPart } from './parse-text-part';

export const analyzeSong = (songDefinition: string): SongInfo => {
    const lines = songDefinition.split('\n');
    const mainInfo = parseForMainInfo(lines);
    const {
        title,
        artist,
        bpm,
        gap,
    } = Object.fromEntries(mainInfo);

    const textParts = lines
        .filter(line => line.charAt(0) !== '#' && line !== '')
        .map(line => {
            const lineParts = line.split(/[ ,]+/);

            if (lineParts.length >= 5) {
                return parseTextPart(lineParts, gap, bpm);
            } else if (lineParts.length === 3) {
                return {
                    type: 'pause',
                    stamp: parseInt(lineParts[1]) + convertMsToStamp(parseInt(gap), bpm),
                    stampMs: convertStampToMs(parseInt(lineParts[1]), bpm) + parseInt(gap),
                    stampEnd: parseInt(lineParts[2]) + convertMsToStamp(parseInt(gap), bpm),
                    stampEndMs: convertStampToMs(parseInt(lineParts[2]), bpm) + parseInt(gap),
                }
            } else {
                return {
                    type: 'pause',
                    stamp: parseInt(lineParts[1]) + convertMsToStamp(parseInt(gap), bpm),
                    stampMs: convertStampToMs(parseInt(lineParts[1]), bpm) + parseInt(gap),
                }
            }
        });

    return {
        title,
        artist,
        bpm: parseInt(bpm),
        gap: parseInt(gap),
        parts: textParts,
    }
}