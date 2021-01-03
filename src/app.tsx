import React, { useState } from 'react';
import { MainMenu } from './pages/main-menu';
import { Level } from './pages/level';
import { SongInfo } from './helpers/analyze-song';
import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import styled from 'styled-components';

const AppWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

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
    <AppWrapper>
      <Switch>
        <Route path="/level">
          <Level songInfo={songInfo}>
          </Level>
        </Route>
        <Route exact path="/">
          <MainMenu onPlay={playLevel}></MainMenu>
        </Route>
      </Switch>
    </AppWrapper>
  );
}

export default App;
