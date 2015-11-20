import Emitter from './emitter';


export default class Store {
  constructor(dispatcher) {
    if (typeof this._handle !== 'function')
      throw new Error('_handle method should be implemented');

    dispatcher.register(payload => this._handle(payload));
    this._emitter = new Emitter();
  }

  _emitChange() {
    this._emitter.emit('change', this);
  }

  addChangeListener(listener) {
    this._emitter.on('change', listener);
  }

  removeChangeListener(listener) {
    this._emitter.off('change', listener);
  }
}
