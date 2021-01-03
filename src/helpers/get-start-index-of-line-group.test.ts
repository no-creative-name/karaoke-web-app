import { getStartIndexOfLineGroup } from "./get-start-index-of-line-group"

describe('getStartIndexOfLineGroup', () => {
  test('returns 0 when lines array is empty', () => {
    expect(getStartIndexOfLineGroup([], 0)).toBe(0);
  });
  test('returns index of first line of type text before given index', () => {
    expect(getStartIndexOfLineGroup(([{
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