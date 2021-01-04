import { getStartIndexOfLine } from "./get-start-index-of-line"

describe('getStartIndexOfLine', () => {
  test('returns 0 when line array is empty', () => {
    expect(getStartIndexOfLine([], 0)).toBe(0);
  });
  test('returns index of first part of type text before given index', () => {
    expect(getStartIndexOfLine(([{
      type: 'text'
    },{
      type: 'pause'
    }, {
      type: 'text'
    }, {
      type: 'text'
    }, {
      type: 'text'
    }, {
      type: 'text'
    }] as any), 4)).toBe(2);
  });
})