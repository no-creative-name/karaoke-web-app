import React, { useEffect, useState } from 'react';
import './App.scss';
import { MainMenu } from './pages/main-menu';
import { Level } from './pages/level';
import { analyzeSong, SongInfo } from './helpers/analyze-song';

export const App: React.FC = () => {
  const [songInfo, setSongInfo] = useState<SongInfo>({
    title: '',
    artist: '',
    bpm: 0,
    gap: 0,
    lines: [],
  });
  const [startMs, setStartMs] = useState<number>(0);
  const [currentMs, setCurrentMs] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (playing) {
      setStartMs((new Date()).getTime());
      setInterval(() => setCurrentMs((new Date()).getTime()), 1);
    }
  }, [playing])

  const playLevel = (song: SongInfo) => {
    setSongInfo(song);
    setPlaying(true);
  }

  return (
    <div className="App">
      {playing ?
        <Level currentMs={currentMs - startMs} songInfo={songInfo}>
        </Level> :
        <MainMenu onPlay={playLevel}></MainMenu>}
    </div>
  );
}

export default App;
