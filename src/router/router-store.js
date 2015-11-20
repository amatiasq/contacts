import Store from '../tools/store';
import { ROUTE_CHANGE } from './router-constants';


export default class ContactsStore extends Store {
  constructor(dispatcher, config) {
    super(dispatcher);
    this._config = config;
    this.state = null;
    this.template = null;
  }

  _handle(payload) {
    if (payload.type === ROUTE_CHANGE)
      this.loadState(payload.state, payload.params);
  }

  loadState(key, params) {
    this.state = this._config[key];
    this.params = params || {};
    this._emitChange();
  }
}
