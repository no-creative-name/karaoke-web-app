import { parseLinesForSongParts } from "./parse-lines-for-song-parts";
import { mocked } from 'ts-jest/utils';
import { parseTextPart } from "./parse-text-part";
import { parsePausePart } from "./parse-pause-part";

jest.mock('./parse-text-part.ts');
jest.mock('./parse-pause-part.ts');

describe('parseLinesForSongParts', () => {
  test('returns empty array if input lines array is empty', () => {
    expect(parseLinesForSongParts([], 0, 0)).toEqual([]);
  });
  test('calls parse functions correct number of times', () => {
    const parseTextPartMock = mocked(parseTextPart);
    const parsePausePartMock = mocked(parsePausePart);

    parseLinesForSongParts([
      '#ignoreThisLine',
      '#ignoreThisLine2',
      ': 24 4 14 Do',
      ': 28 8 14 Not',
      ': 32 12 14 Ignore',
      '- 36',
      ': 40 12 14 These',
    ], 0, 0);

    expect(parseTextPartMock).toHaveBeenCalledTimes(4);
    expect(parsePausePartMock).toHaveBeenCalledTimes(1);
  });
  test('returns correct number of parts', () => {
    expect(parseLinesForSongParts([
      '#ignoreThisLine',
      '#ignoreThisLine2',
      ': 24 4 14 Do',
      ': 28 8 14 Not',
      ': 32 12 14 Ignore',
      '- 36',
      ': 40 12 14 These',
      ''
    ], 0, 0)).toHaveLength(5);
  });
});