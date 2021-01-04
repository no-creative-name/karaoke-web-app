import { getIndexOfFirstPartAfter } from "./get-index-of-first-part-after";

describe('getIndexOfFirstPartAfter', () => {
  test('returns -1 when line array is empty', () => {
    expect(getIndexOfFirstPartAfter([], 0)).toBe(-1);
  });
  test('returns -1 when given stamp is after all line stamps', () => {
    expect(getIndexOfFirstPartAfter(([{
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
  test('returns index of first part after given stamp', () => {
    expect(getIndexOfFirstPartAfter(([{
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