import { PausePart } from "../../interfaces";
import { convertMsToStamp } from "../conversion/convert-ms-to-stamp";
import { convertStampToMs } from "../conversion/convert-stamp-to-ms";

export const parsePausePart = (lineParts: string[], songGap: number, songBpm: number): PausePart => {
  if (lineParts.length < 2) {
    throw new Error();
  }
  if (lineParts.length === 3) {
    return {
      type: 'pause',
      stamp: parseInt(lineParts[1]) + convertMsToStamp(songGap, songBpm),
      stampMs: convertStampToMs(parseInt(lineParts[1]), songBpm) + songGap,
      stampEnd: parseInt(lineParts[2]) + convertMsToStamp(songGap, songBpm),
      stampEndMs: convertStampToMs(parseInt(lineParts[2]), songBpm) + songGap,
    }
  } else {
    return {
      type: 'pause',
      stamp: parseInt(lineParts[1]) + convertMsToStamp(songGap, songBpm),
      stampMs: convertStampToMs(parseInt(lineParts[1]), songBpm) + songGap,
    }
  }
}