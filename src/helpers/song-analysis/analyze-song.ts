import { SongInfo } from '../../interfaces';
import { parseForMainInfo } from './parse-for-main-info';
import { parseLinesForSongParts } from './parse-lines-for-song-parts';

export const analyzeSong = (songDefinition: string): SongInfo => {
    const lines = songDefinition.split('\n');
    const {
        title,
        artist,
        bpm,
        gap,
    } = Object.fromEntries(parseForMainInfo(lines));

    return {
        title,
        artist,
        bpm: parseInt(bpm),
        gap: parseInt(gap),
        parts: parseLinesForSongParts(lines, parseInt(bpm), parseInt(gap)),
    }
}