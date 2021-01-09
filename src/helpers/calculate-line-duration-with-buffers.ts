import { TextPart } from "../interfaces";

export const calculateLineDurationWithBuffers = (line: TextPart[]): number => {
  if(line.length === 0) {
    return 0;
  }
  if(line.length === 1) {
    return line[0].durationMs;
  }
  return line[line.length - 1].stampMs + line[line.length - 1].durationMs - line[0].stampMs;
} 