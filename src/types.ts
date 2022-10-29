export const rootSelector = '#root' as const;

export type EventType<T = Event> = Record<string, (e: T) => void>;
