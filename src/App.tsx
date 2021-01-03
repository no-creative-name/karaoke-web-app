import React, { useState } from 'react';
import './App.scss';
import { MainMenu } from './pages/main-menu';
import { Level } from './pages/level';
import { SongInfo } from './helpers/analyze-song';
import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

export const App: React.FC = () => {
  const [songInfo, setSongInfo] = useState<SongInfo>({
    title: '',
    artist: '',
    bpm: 0,
    gap: 0,
    lines: [],
  });
  const history = useHistory();

  /*useEffect(() => {
    const lastLine = songInfo.lines[songInfo.lines.length - 1];
    if (lastLine && currentMs - startMs > lastLine.stampMs) {
      history.push('/');
    }
  }, [currentMs]);*/

  const playLevel = (song: SongInfo) => {
    setSongInfo(song);

    history.push('/level');
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/level">
          <Level songInfo={songInfo}>
          </Level>
        </Route>
        <Route exact path="/">
          <MainMenu onPlay={playLevel}></MainMenu>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
