import { getFirstTextPartBefore } from "./get-first-text-part-before";

describe('getFirstTextLineBefore', () => {
  test('returns 0 when line array is empty', () => {
    expect(getFirstTextPartBefore([], 0)).toBe(0);
  });
  test('returns index of given index when given index is of type text', () => {
    expect(getFirstTextPartBefore(([{
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
  test('returns index of first part of type text before given index', () => {
    expect(getFirstTextPartBefore(([{
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