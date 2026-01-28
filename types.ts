
export enum AppState {
  TEASER = 'TEASER',
  INTRO = 'INTRO',
  TEASE_GATE = 'TEASE_GATE',
  VALENTINE_HUB = 'VALENTINE_HUB',
  DAY_VIEW = 'DAY_VIEW',
  PROPOSE_DAY = 'PROPOSE_DAY',
  JOURNEY = 'JOURNEY',
  WHISPERS = 'WHISPERS',
  INTERLUDE = 'INTERLUDE',
  TIMELINE = 'TIMELINE',
  QUIZ = 'QUIZ',
  KIKI = 'KIKI',
  FINAL = 'FINAL',
  FINAL_END = 'FINAL_END'
}

export interface TimelineEntry {
  label: string;
  date?: string;
  desc?: string;
}
