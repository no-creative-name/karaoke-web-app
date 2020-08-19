import React, { useEffect, useState, useRef } from 'react';
import { songs } from '../../mock';
import { analyzeSong, SongInfo } from '../../helpers/analyze-song';

interface MainMenuProps {
    onPlay(song: SongInfo): void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onPlay }) => {
    const selectRef = useRef<HTMLSelectElement>(document.createElement('select'));
    const [analyzedSongs, setAnalyzedSongs] = useState<SongInfo[]>([]);

    const onPlayButtonClick = () => {
        onPlay(analyzedSongs[selectRef.current.selectedIndex]);
    }

    useEffect(() => {
        setAnalyzedSongs(songs.map((song) =>
            analyzeSong(song)
        ));
    }, [])

    return (
        <React.Fragment>
            <select ref={selectRef}>
                {
                    analyzedSongs?.map(song => <option value={song.title}>{song.title}</option>)
                }
            </select>
            <button onClick={onPlayButtonClick}>Play</button>
        </React.Fragment>
    )
}