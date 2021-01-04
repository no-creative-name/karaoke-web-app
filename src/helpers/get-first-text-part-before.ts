import { SongPart } from "../interfaces";

export const getFirstTextPartBefore = (line: SongPart[], partIndex: number): number => {
  let index = 0;

  for (let i = partIndex; i > 0; i--) {
    if ((line[i].type === 'text' && !index)) {
      index = i;
    }
  }
  return index;
}