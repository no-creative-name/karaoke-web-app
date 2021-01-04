import { SongPart } from "../interfaces";

export const getIndexOfFirstPartAfter = (line: SongPart[], stamp: number) => {
  for (let i = 0; i <= line.length -1; i++) {
    if (line[i].stamp >= stamp) {
      return i;
    }
  }
  return -1;
}