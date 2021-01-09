import { SongPart } from "../../interfaces";
import { parsePausePart } from "./parse-pause-part";
import { parseTextPart } from "./parse-text-part";

export const parseLinesForSongParts = (lines: string[], songGap: number, songBpm: number): SongPart[] => {
  const parts: SongPart[] = [];

  lines
    .filter(line => line.charAt(0) !== '#' && line !== '')
    .forEach(line => {
      const lineParts = line.split(/[ ,]+/);

      if (lineParts.length >= 5) {
        parts.push(parseTextPart(lineParts, songGap, songBpm));
      } else if (lineParts.length >= 2) {
        parts.push(parsePausePart(lineParts, songGap, songBpm));
      }
    });

  return parts;
}