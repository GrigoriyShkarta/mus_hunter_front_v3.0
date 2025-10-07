export const enProfessions = {
  guitar: 'guitarist',
  vocal: 'vocalist',
  drums: 'drummer',
  bass: 'bassist',
  piano: 'pianist',
  violin: 'violinist',
  saxophone: 'saxophonist',
  trumpet: 'trumpeter',
  flute: 'flutist',
  cello: 'cellist',
  dj: 'DJ',
  manager: 'manager',
  producer: 'producer',
  sound: 'sound engineer',
  composer: 'composer',
  conductor: 'conductor',
  arranger: 'arranger',
  backing_vocal: 'backing vocalist',
  percussion: 'percussionist',
  keyboard: 'keyboardist',
} as const;

export type EnglishProfessionKey = keyof typeof enProfessions;
