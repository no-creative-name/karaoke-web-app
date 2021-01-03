import { SongLine } from "./analyze-song";

export const getFirstTextLineBefore = (lines: SongLine[], lineIndex: number): number => {
  let index = 0;

  for (let i = lineIndex; i > 0; i--) {
    if ((lines[i].type === 'text' && !index)) {
      index = i;
    }
  }
  return index;
}