import { SongInfo } from '../interfaces';
import { convertMsToStamp } from './convert-ms-to-stamp';
import { convertStampToMs } from './convert-stamp-to-ms';

export const analyzeSong = (songDefinition: string): SongInfo => {
    const lines = songDefinition.split('\n');
    const mainInfoArray = lines.filter(line => line.charAt(0) === '#').map(line => ([
        line.split(':')[0].toLowerCase().split('#')[1],
        line.split(':')[1].replace(',', '.'),
    ]));
    const {
        title,
        artist,
        bpm
    } = Object.fromEntries(mainInfoArray);

    const gap = '0';

    const textParts = lines
        .filter(line => line.charAt(0) !== '#' && line !== '')
        .map(line => {
            const lineParts = line.split(/[ ,]+/);

            if (lineParts.length >= 5) {
                return {
                    type: 'text',
                    isGold: lineParts[0] === '*',
                    isSpoken: lineParts[0] === 'F',
                    stamp: parseInt(lineParts[1]) + convertMsToStamp(parseInt(gap), bpm),
                    duration: parseInt(lineParts[2]),
                    pitch: parseInt(lineParts[3]),
                    text: lineParts[4],
                    stampMs: convertStampToMs(parseInt(lineParts[1]), bpm) + parseInt(gap),
                    durationMs: convertStampToMs(parseInt(lineParts[2]), bpm),
                }
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