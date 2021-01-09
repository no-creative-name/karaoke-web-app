import { convertStampToMs } from "./convert-stamp-to-ms";

describe('convertStampToMs', () => {
  test('converts correctly', () => {
    expect(convertStampToMs(96, 120)).toBe(12000);
    expect(convertStampToMs(112, 120)).toBe(14000);
    expect(convertStampToMs(192, 180)).toBe(16000);
  });
})