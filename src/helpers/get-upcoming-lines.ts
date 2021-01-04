import { SongPart, TextPart } from "../interfaces";
import { getEndIndexOfLine } from "./get-end-index-of-line";
import { getStartIndexOfLine } from "./get-start-index-of-line";

export const getUpcomingLines = (allLines: SongPart[], currentMs: number, lookaheadMs: number): TextPart[][] => {
  const upcomingIndices: number[] = [];
  allLines.forEach(
    (line, index) => {
      if (line.stampMs < currentMs + lookaheadMs && line.stampMs > currentMs && line.type === 'text') {
        upcomingIndices.push(index);
      }
    }
  );

  const upcomingLines = new Set<string>();

  upcomingIndices.forEach(index => {
    const startIndex = getStartIndexOfLine(allLines, index);
    const endIndex = getEndIndexOfLine(allLines, index);

    upcomingLines.add(JSON.stringify(allLines.slice(startIndex, endIndex + 1)));
  });
  
  return Array.from(upcomingLines).map((json) => JSON.parse(json));
}