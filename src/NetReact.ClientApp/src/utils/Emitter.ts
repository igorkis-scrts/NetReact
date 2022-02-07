import { EventKey, EventRegistry } from "@config/EventRegistry";
import { EventEmitter } from "eventemitter3";

class Emitter extends EventEmitter {
  public publish<T extends EventKey>(eventName: T, params?: EventRegistry[T]) {
    this.emit(eventName, params);
  }

  public subscribe<T extends EventKey>(eventName: T, action: (message?: any) => void) {
    this.on(eventName, action);
  }

  public unsubscribe<T extends EventKey>(eventName: T, action: (message?: any) => void) {
    this.off(eventName, action);
  }
}

export default new Emitter();
