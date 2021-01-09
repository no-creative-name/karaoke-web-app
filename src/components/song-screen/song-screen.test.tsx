import { render, screen, waitFor } from "@testing-library/react";
import { SongScreen } from ".";

describe('SongScreen', () => {
  const line = [
    {
      type: 'text',
      stamp: 4,
      stampMs: 1000,
      text: 'Word 1',
      duration: 4,
      durationMs: 1000,
      pitch: 50,
      isGold: false,
      isSpoken: false,
    }, {
      type: 'text',
      stamp: 4,
      stampMs: 1000,
      text: 'Word 2',
      duration: 4,
      durationMs: 1000,
      pitch: 50,
      isGold: false,
      isSpoken: false,
    }, {
      type: 'text',
      stamp: 4,
      stampMs: 1000,
      text: 'Word 3',
      duration: 4,
      durationMs: 1000,
      pitch: 50,
      isGold: false,
      isSpoken: false,
    }
  ];
  test('renders current line', () => {
    render(<SongScreen
      line={line}
      upcomingLines={[]}
      currentMs={1000}
    ></SongScreen>);
    screen.getByText('Word 1');
    screen.getByText('Word 2');
    screen.getByText('Word 3');
  });
  test('renders first line of upcoming lines if not equal to current line', () => {
    render(<SongScreen
      line={line}
      upcomingLines={[[
        {
          type: 'text',
          stamp: 4,
          stampMs: 1000,
          text: 'Word 4',
          duration: 4,
          durationMs: 1000,
          pitch: 50,
          isGold: false,
          isSpoken: false,
        }
      ]]}
      currentMs={1000}
    ></SongScreen>);
    screen.getByText('Word 4');
  });
  test('renders second line of upcoming lines if first is equal to current line', () => {
    render(<SongScreen
      line={line}
      upcomingLines={[
        line,
        [
          {
            type: 'text',
            stamp: 4,
            stampMs: 1000,
            text: 'Word 4',
            duration: 4,
            durationMs: 1000,
            pitch: 50,
            isGold: false,
            isSpoken: false,
          }
        ]]}
      currentMs={1000}
    ></SongScreen>);
    const word1Instances = screen.getAllByText('Word 1');
    expect(word1Instances).toHaveLength(1);
    screen.getByText('Word 4');
  });
});