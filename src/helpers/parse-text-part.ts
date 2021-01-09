import { TextPart } from "../interfaces";
import { convertMsToStamp } from "./convert-ms-to-stamp";
import { convertStampToMs } from "./convert-stamp-to-ms";

export const parseTextPart = (lineParts: string[], songGap: string, songBpm: string): TextPart => {
  if (lineParts.length < 5) {
    throw new Error();
  }
  return {
    type: 'text',
    isGold: lineParts[0] === '*',
    isSpoken: lineParts[0] === 'F',
    stamp: parseInt(lineParts[1]) + convertMsToStamp(parseInt(songGap), parseInt(songBpm)),
    duration: parseInt(lineParts[2]),
    pitch: parseInt(lineParts[3]),
    text: lineParts[4],
    stampMs: convertStampToMs(parseInt(lineParts[1]), parseInt(songBpm)) + parseInt(songGap),
    durationMs: convertStampToMs(parseInt(lineParts[2]), parseInt(songBpm)),
  }
}