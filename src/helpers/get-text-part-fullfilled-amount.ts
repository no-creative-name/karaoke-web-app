import { TextPart } from "../interfaces";

export const getTextPartFulfilledAmount = ({ stampMs, durationMs }: TextPart, currentMs: number): number => {
  if(stampMs > currentMs) {
    return 0;
  }
  if(stampMs + durationMs < currentMs) {
    return 100;
  }
  return (currentMs - stampMs) / durationMs * 100;
}