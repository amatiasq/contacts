import Store from '../tools/store';
import { ROUTE_CHANGE } from './router-constants';


export default class ContactsStore extends Store {
  constructor(dispatcher, config) {
    super(dispatcher);
    this.setConfig(config);
    this.state = null;
    this.template = null;
  }

  setConfig(config) {
    this._states = Object.keys(config)
      .concat(Object.getOwnPropertySymbols(config))
      .map(key => Object.assign({ key }, config[key], parseUrlPattern(config[key].url)));
  }

  _handle(payload) {
    if (payload.type === ROUTE_CHANGE)
      this.loadKey(payload.state, payload.params);
  }

  _getStateByKey(key) {
    return this._states.filter(state => state.key === key)[0];
  }

  _getStatesByUrl(url) {
    return this._states.filter(state => state.pattern.test(url));
  }

  _getParamsFor(url, state) {
    const keys = state.params;
    const values = state.pattern.exec(url).slice(1);
    const params = {};
    keys.forEach((key, index) => params[key] = values[index]);
    return params;
  }

  loadUrl(url) {
    const states = this._getStatesByUrl(url);

    if (states.length === 0)
      return this.loadState(this._getStateByKey('default'));

    if (states.length > 1) {
      // TODO handle url with more than one state
      throw new Error('Not implemented');
    }

    const state = states[0];
    return this.loadState(state, this._getParamsFor(url, state));
  }

  loadKey(key) {
    const state = this._getStateByKey(key);

    if (!state)
      throw new Error(`State for key "${key}" not found`);

    return this.loadState(state);
  }

  getUrl(state, params) {
    return state.split
      .map((value, index) => isEven(index) ? value : (params[value] || ''))
      .join('');
  }

  loadState(state, params) {
    this.state = state;
    this.params = params || {};
    this._emitChange();
  }
}


function parseUrlPattern(pattern) {
  const split = pattern.split(/{(\w+)}/);
  const literals = split.filter((_, index) => isEven(index));
  const params = split.filter((_, index) => !isEven(index));
  const regexp = split.map((value, index) => isEven(index) ?
    value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') :
    '([^\\/]+)');

  return {
    pattern: new RegExp('^' + regexp.join('') + '$', 'i'),
    split, literals, params,
  };
}

function isEven(number) {
  return number % 2 === 0;
}
