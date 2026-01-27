
export enum AppState {
  INTRO = 'INTRO',
  LANDING = 'LANDING',
  JOURNEY = 'JOURNEY',
  WHISPERS = 'WHISPERS',
  INTERLUDE = 'INTERLUDE',
  TIMELINE = 'TIMELINE',
  QUIZ = 'QUIZ',
  KIKI = 'KIKI',
  FINAL = 'FINAL'
}

export interface TimelineEntry {
  label: string;
  date?: string;
}
