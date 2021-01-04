export interface SongInfo {
  title: string;
  artist: string;
  bpm: number;
  gap: number;
  parts: SongPart[];
}

export type SongPart = TextPart | PausePart;

export interface TextPart {
  type: string;
  stamp: number;
  stampMs: number;
  text: string;
  duration: number;
  durationMs: number;
  pitch: number;
  isGold: boolean;
  isSpoken: boolean;
}

export interface PausePart {
  type: string;
  stamp: number;
  stampMs: number;
  stampEnd?: number;
  stampEndMs?: number;
}