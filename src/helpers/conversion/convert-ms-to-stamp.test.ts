import { convertMsToStamp } from "./convert-ms-to-stamp";

describe('convertMsToStamp', () => {
  test('converts correctly', () => {
    expect(convertMsToStamp(12000, 120)).toBe(96);
    expect(convertMsToStamp(14000, 120)).toBe(112);
    expect(convertMsToStamp(16000, 180)).toBe(192);
  });
})