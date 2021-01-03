import { getEndIndexOfLineGroup } from "./get-end-index-of-line-group"

describe('getEndIndexOfLineGroup', () => {
  test('returns 0 when lines array is empty', () => {
    expect(getEndIndexOfLineGroup([], 0)).toBe(0);
  });
  test('returns index of last line of type text after given index', () => {
    expect(getEndIndexOfLineGroup(([{
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
  test('returns index of last line of type text after given index', () => {
    expect(getEndIndexOfLineGroup(([{
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
    }, {
      type: 'text'
    },] as any), 3)).toBe(4);
  });
})