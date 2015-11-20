import Store from '../tools/store';
import { ROUTE_CHANGE } from './routing-constants';


export default class ContactsStore extends Store {
  constructor(dispatcher, config) {
    super(dispatcher);
    this._config = config;
    this.state = null;
    this.template = null;
  }

  _handle(payload) {
    if (payload.type !== ROUTE_CHANGE)
      return;

    this.state = this._config[payload.state];
    this.params = payload.params || {};
    this._emitChange();
  }
}
