import { calculateLineDurationWithBuffers } from "./calculate-line-duration-with-buffers";

describe('calculateLineDurationWithBuffers', () => {
  test('returns 0 when line empty', () => {
    expect(calculateLineDurationWithBuffers([])).toBe(0);
  });
  describe('calculates line duration correctly', () => {
    test('for one text part', () => {
      expect(calculateLineDurationWithBuffers(([
        {
          stampMs: 1000,
          durationMs: 200,
        }
      ] as any))).toBe(200);
    })
    test('for more than one text part', () => {
      expect(calculateLineDurationWithBuffers(([
        {
          stampMs: 1000,
          durationMs: 200,
        },
        {
          stampMs: 1400,
          durationMs: 200,
        },
        {
          stampMs: 2000,
          durationMs: 200,
        },
        {
          stampMs: 3000,
          durationMs: 200,
        },
      ] as any))).toBe(2200);
    });
  })
});