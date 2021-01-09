import { parsePausePart } from "./parse-pause-part";

jest.mock('../conversion/convert-ms-to-stamp', () => {
  return {
    convertMsToStamp: (ms: number, bpm: number) => ms + bpm,
  };
});
jest.mock('../conversion/convert-stamp-to-ms', () => {
  return {
    convertStampToMs: (stamp: number, bpm: number) => stamp + bpm * 10,
  };
});

describe('parsePausePart', () => {
  test('throws error when length of input lines array is < 2', () => {
    expect(() => parsePausePart(['value'], 0, 0)).toThrowError();
  });
  test('returns pause part when length of input lines array is 3', () => {
    expect(parsePausePart(['*', '123', '4',], 20, 100)).toEqual({
      type: 'pause',
      stamp: 243,
      stampMs: 1143,
      stampEnd: 124,
      stampEndMs: 1024,
    });
  });
  test('returns pause part when length of input lines array is 2', () => {
    expect(parsePausePart(['*', '123'], 20, 100)).toEqual({
      type: 'pause',
      stamp: 243,
      stampMs: 1143,
    });
  });
});