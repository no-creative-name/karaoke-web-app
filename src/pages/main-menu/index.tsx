import React, { useEffect, useState, useRef } from 'react';
import { songs } from '../../mock';
import { analyzeSong } from '../../helpers/song-analysis/analyze-song';
import { SongInfo } from '../../interfaces';
import styled from 'styled-components';
import { AbsoluteButton } from '../../components/absolute-button';

interface MainMenuProps {
    onPlay(song: SongInfo): void;
}

const StyledSelect = styled.select`
    width: 80vw;
    margin-bottom: 50px;
`

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
            <StyledSelect ref={selectRef}>
                {
                    analyzedSongs.map(song =>
                        <option
                            key={song.title}
                            value={song.title}>
                            {song.artist} - {song.title}
                        </option>)
                }
            </StyledSelect>
            <AbsoluteButton onClick={onPlayButtonClick}>Play</AbsoluteButton>
        </React.Fragment>
    )
}