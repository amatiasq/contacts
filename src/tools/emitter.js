/**
 * interface Emitter {
 *   void on(String signal, Function handler);
 *   void off(String signal, Function handler);
 *   void emit(String signal, Object var_args...);
 * }
 *
 * Provides a constructor to listen and emit signals.
 */
export default class Emitter {
  constructor() {
    this._listeners = {};
  }

  on(signal, handler) {
    let list = this._listeners;
    if (hasListener(list, signal, handler))
      return;

    list[signal] = list[signal] || [];
    list[signal].push(handler);
  }

  off(signal, handler) {
    if (!hasListener(this._listeners, signal, handler))
      return;

    let list = this._listeners[signal];
    let index = list.indexOf(handler);
    list.splice(index, 1);
  }

  emit(signal, ...args) {
    let list = this._listeners[signal];
    if (list)
      list.forEach(handler => handler(...args));
  }
}


function hasListener(listeners, signal, handler) {
  if (!listeners[signal])
    return false;

  return listeners[signal].indexOf(handler) !== -1;
}
