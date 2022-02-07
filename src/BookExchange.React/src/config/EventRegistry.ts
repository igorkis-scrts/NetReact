export interface EventRegistry {
  "refresh-book-list": undefined;
  "add-edit-book": boolean;
  "sign-in": boolean;
  "sign-up": boolean;
}

export type EventKey = Extract<keyof EventRegistry, string>;
