export const parseForMainInfo = (lines: string[]): string[][] => lines
  .filter(line => line.charAt(0) === '#')
  .map(line => ([
    line.split(':')[0].toLowerCase().split('#')[1],
    line.split(':')[1].replace(',', '.'),
  ]));