export interface EventRegistry {
  "add-book": boolean;
  "sign-in": boolean;
  "sign-up": boolean;
}

export type EventKey = Extract<keyof EventRegistry, string>;