type Callback = (...args: any) => void;

export default class EventBus {
  private readonly listeners: Record<string, Set<Callback>>;

  constructor() {
    this.listeners = {};
  }

  subscribe(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }

    this.listeners[event].add(callback);
  }

  unsubscribe(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    const callbacks = this.listeners[event];

    callbacks.delete(callback);
    if (callbacks.size === 0) {
      delete this.listeners[event];
    }
  }

  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
