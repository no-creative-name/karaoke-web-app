import { SongPart } from "../interfaces";

export const getEndIndexOfLine = (line: SongPart[], partIndex: number): number => {
  let index = line.length ? line.length - 1 : 0;

  for (let i = partIndex; i <= line.length - 2; i++) {
    if (line[i + 1].type === 'pause') {
      return i;
    }
  }

  return index;
}