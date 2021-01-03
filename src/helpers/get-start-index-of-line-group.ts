import { SongLine } from "./analyze-song";

export const getStartIndexOfLineGroup = (lines: SongLine[], lineIndex: number): number => {
  let index = 0;

  for (let i = lineIndex; i > 0; i--) {
    if ((lines[i - 1].type === 'pause' && !index)) {
      index = i;
    }
  }
  return index;
}