import { parseForMainInfo } from "./parse-for-main-info";

describe('parseForMainInfo', () => {
  test('returns empty array when no input array is empty', () => {
    expect(parseForMainInfo([])).toEqual([]);
  });
  test('returns empty array when no input array does not contain lines in correct format', () => {
    expect(parseForMainInfo([
      'line1',
      'line2:test',
      'line3.test'
    ])).toEqual([]);
  });
  test('returns array with subarray per line with #', () => {
    expect(parseForMainInfo([
      '#INFO1:Value1',
      '#INFO2:Value2',
      '#INFOXYZ:Value3'
    ])).toEqual([[
      'info1',
      'Value1'
    ],[
      'info2',
      'Value2'
    ],[
      'infoxyz',
      'Value3'
    ]]);
  });
});