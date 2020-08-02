import React, { useEffect, useState } from 'react';
import './App.scss';
import { SongContainer } from './components/song-container';
import { song1 as song } from './mock';
import { analyzeSong, SongInfo } from './helpers/analyze-song';

export const App: React.FC = () => {
  const [songInfo, setSongInfo] = useState<SongInfo>();
  const [startMs, setStartMs] = useState<number>(0);
  const [currentMs, setCurrentMs] = useState<number>(0);

  useEffect(() => {
    setStartMs((new Date()).getTime());
    setSongInfo(analyzeSong(song));
    setInterval(() => setCurrentMs((new Date()).getTime()), 1);
  }, []);

  return (
    <div className="App">
      {
        songInfo ? 
        <SongContainer currentMs={currentMs - startMs} songInfo={songInfo}>
        </SongContainer> : ''
      }
    </div>
  );
}

export default App;
