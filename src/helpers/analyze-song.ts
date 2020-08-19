import { convertStampToMs } from './convert-stamp-to-ms';

export interface SongInfo {
    title: string;
    artist: string;
    bpm: number;
    gap: number;
    lines: SongLine[];
}

export type SongLine = TextLine | PauseLine;

export interface TextLine {
    type: string;
    stamp: number;
    stampMs: number;
    text: string;
    duration: number;
    durationMs: number;
    pitch: number;
    gold?: boolean;
    spoken?: boolean;
}

export interface PauseLine {
    type: string;
    stamp: number;
    stampMs: number;
    stampEnd?: number;
    stampEndMs?: number;
}

export const analyzeSong = (songDefinition: string): SongInfo => {
    const lines = songDefinition.split('\n');
    const mainInfoArray = lines.filter(line => line.charAt(0) === '#').map(line => ([
        line.split(':')[0].toLowerCase().split('#')[1],
        line.split(':')[1].replace(',', '.'),
    ]));
    const mainInfo = Object.fromEntries(mainInfoArray);

    const textLines = lines
        .filter(line => line.charAt(0) !== '#' && line !== '')
        .map(line => {
            const lineParts = line.split(/[ ,]+/);
    
            if (lineParts.length >= 5) {
                return {
                    type: 'text',
                    stamp: parseInt(lineParts[1]),
                    text: lineParts[4],
                    duration: parseInt(lineParts[2]),
                    pitch: parseInt(lineParts[3]),
                    gold: lineParts[0] === '*',
                    spoken: lineParts[0] === 'F',
                    stampMs: convertStampToMs(parseInt(lineParts[1]), mainInfo.bpm),
                    durationMs: convertStampToMs(parseInt(lineParts[2]), mainInfo.bpm),
                }
            } else if (lineParts.length === 3) {
                return {
                    type: 'pause',
                    stamp: parseInt(lineParts[1]),
                    stampMs: convertStampToMs(parseInt(lineParts[1]), mainInfo.bpm),
                    stampEnd: parseInt(lineParts[2]),
                    stampEndMs: convertStampToMs(parseInt(lineParts[2]), mainInfo.bpm),
                }
            } else {
                return {
                    type: 'pause',
                    stamp: parseInt(lineParts[1]),
                    stampMs: convertStampToMs(parseInt(lineParts[1]), mainInfo.bpm),
                }
            }
        });

    return {
        title: mainInfo.title,
        artist: mainInfo.artist,
        bpm: mainInfo.bpm,
        gap: mainInfo.gap,
        lines: textLines,
    }
}