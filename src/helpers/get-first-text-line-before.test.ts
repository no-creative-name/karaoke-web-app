import { getFirstTextLineBefore } from "./get-first-text-line-before";

describe('getFirstTextLineBefore', () => {
  test('returns 0 when lines array is empty', () => {
    expect(getFirstTextLineBefore([], 0)).toBe(0);
  });
  test('returns index of given index when given index is of type text', () => {
    expect(getFirstTextLineBefore(([{
      type: 'text'
    },{
      type: 'pause'
    }, {
      type: 'text'
    }, {
      type: 'pause'
    }, {
      type: 'pause'
    }, {
      type: 'pause'
    }] as any), 5)).toBe(2);
  });
  test('returns index of first line of type text before given index', () => {
    expect(getFirstTextLineBefore(([{
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
      type: 'pause'
    }] as any), 3)).toBe(3);
  });
})