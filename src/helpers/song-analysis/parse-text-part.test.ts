import { parseTextPart } from "./parse-text-part";

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

describe('parseTextPart', () => {
  test('throws error when length of input lines array is < 5', () => {
    expect(() => parseTextPart(['value', 'value'], 0, 0)).toThrowError();
  });
  test('returns text part when length of input lines array is >= 5', () => {
    expect(parseTextPart(['*', '123', '4', '60', 'Text content'], 20, 100)).toEqual({
      type: 'text',
      isGold: true,
      isSpoken: false,
      stamp: 243,
      duration: 4,
      pitch: 60,
      text: 'Text content',
      stampMs: 1143,
      durationMs: 1004,
    });
    expect(parseTextPart(['*', '200', '8', '80', 'Text content'], 20, 100)).toEqual({
      type: 'text',
      isGold: true,
      isSpoken: false,
      stamp: 320,
      duration: 8,
      pitch: 80,
      text: 'Text content',
      stampMs: 1220,
      durationMs: 1008,
    });
  });
});