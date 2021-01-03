import { SongLine } from "./analyze-song";

export const getEndIndexOfLineGroup = (lines: SongLine[], lineIndex: number): number => {
  let index = lines.length ? lines.length - 1 : 0;

  for (let i = lineIndex; i <= lines.length - 2; i++) {
    if (lines[i + 1].type === 'pause') {
      return i;
    }
  }

  return index;
}