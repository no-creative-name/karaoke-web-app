import { getIndexOfFirstLineAfter } from "./get-index-of-first-line-after";

describe('getIndexOfFirstLineAfter', () => {
  test('returns -1 when lines array is empty', () => {
    expect(getIndexOfFirstLineAfter([], 0)).toBe(-1);
  });
  test('returns -1 when given stamp is after all line stamps', () => {
    expect(getIndexOfFirstLineAfter(([{
      type: 'text',
      stamp: 100
    },{
      type: 'pause',
      stamp: 200
    }, {
      type: 'text',
      stamp: 300
    }, {
      type: 'pause',
      stamp: 400
    }, {
      type: 'pause',
      stamp: 500
    }] as any), 600)).toBe(-1);
  });
  test('returns index of first line after given stamp', () => {
    expect(getIndexOfFirstLineAfter(([{
      type: 'text',
      stamp: 100
    },{
      type: 'pause',
      stamp: 200
    }, {
      type: 'text',
      stamp: 300
    }, {
      type: 'pause',
      stamp: 400
    }, {
      type: 'pause',
      stamp: 500
    }] as any), 250)).toBe(2);
  });
})