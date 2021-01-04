import { SongPart } from "../interfaces";

export const getStartIndexOfLine = (line: SongPart[], partIndex: number): number => {
  let index = 0;

  for (let i = partIndex; i > 0; i--) {
    if ((line[i - 1].type === 'pause' && !index)) {
      index = i;
    }
  }
  return index;
}