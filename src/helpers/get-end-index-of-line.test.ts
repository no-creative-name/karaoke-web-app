import { getEndIndexOfLine } from "./get-end-index-of-line"

describe('getEndIndexOfLine', () => {
  test('returns 0 when line array is empty', () => {
    expect(getEndIndexOfLine([], 0)).toBe(0);
  });
  test('returns index of last part of type text after given index', () => {
    expect(getEndIndexOfLine(([{
      type: 'text'
    }, {
      type: 'pause'
    }, {
      type: 'text'
    }, {
      type: 'text'
    }, {
      type: 'text'
    }, {
      type: 'pause'
    }] as any), 3)).toBe(4);
  });
})