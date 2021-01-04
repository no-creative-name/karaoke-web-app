import { getUpcomingLines } from "./get-upcoming-lines";

describe('getUpcomingLines', () => {
  test('returns empty array if there are no upcoming lines inside lookahead', () => {
    expect(getUpcomingLines(([{
      type: 'text',
      stampMs: 100
    }, {
      type: 'pause',
      stampMs: 200
    }, {
      type: 'text',
      stampMs: 300
    }, {
      type: 'pause',
      stampMs: 400
    }, {
      type: 'pause',
      stampMs: 500
    }] as any), 200, 50)).toEqual([]);
  });
  test('returns upcoming text lines inside threshold', () => {
    expect(getUpcomingLines(([{
      type: 'text',
      stampMs: 100
    }, {
      type: 'pause',
      stampMs: 200
    }, {
      type: 'text',
      stampMs: 300
    }, {
      type: 'text',
      stampMs: 350
    }, {
      type: 'pause',
      stampMs: 400
    }, {
      type: 'pause',
      stampMs: 500
    }, {
      type: 'text',
      stampMs: 600
    }, {
      type: 'text',
      stampMs: 700
    }] as any), 200, 450)).toEqual([
      [{
        type: 'text',
        stampMs: 300
      }, {
        type: 'text',
        stampMs: 350
      }],
      [{
        type: 'text',
        stampMs: 600
      }, {
        type: 'text',
        stampMs: 700
      }]
    ]);
  });
});