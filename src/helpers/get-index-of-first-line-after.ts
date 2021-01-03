import { SongLine } from "./analyze-song";
import { convertMsToStamp } from "./convert-ms-to-stamp";

export const getIndexOfFirstLineAfter = (lines: SongLine[], stamp: number) => {
  for (let i = 0; i <= lines.length -1; i++) {
    if (lines[i].stamp >= stamp) {
      return i;
    }
  }
  return -1;
}