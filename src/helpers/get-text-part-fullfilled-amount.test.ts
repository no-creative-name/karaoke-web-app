import { getTextPartFulfilledAmount } from "./get-text-part-fullfilled-amount";

describe('getTextPartFulfilledAmount', () => {
  test('returns 0 when text part is not active yet', () => {
    expect(getTextPartFulfilledAmount(({
      type: 'text',
      stampMs: 1000,
    } as any), 0)).toBe(0);
  });
  test('returns 100 when text part is over', () => {
    expect(getTextPartFulfilledAmount(({
      type: 'text',
      stampMs: 1000,
      durationMs: 500,
    } as any), 1550)).toBe(100);
  });
  test('returns correct percentage when text part is active', () => {
    expect(getTextPartFulfilledAmount(({
      type: 'text',
      stampMs: 1000,
      durationMs: 500,
    } as any), 1200)).toBe(40);
  });
});