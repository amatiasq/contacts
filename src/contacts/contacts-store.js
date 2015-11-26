import autobind from 'decorators/autobind';
import Store from '../tools/store';
import Dispatcher from '../tools/dispatcher';
import { goToList } from '../app/actions';
import * as constants from '../app/constants';
import UserStore from '../login/user-store';


const handlers = {
  [constants.CREATE_CONTACT](store, payload) {
    store.ref.push(payload.data);
    fuckingUglyHack();
  },

  [constants.SAVE_CONTACT](store, payload) {
    const { $key, ...data } = { ...store.get(payload.key), ...payload.data };
    store.ref.child(payload.key).set(data);
    fuckingUglyHack();
  },

  [constants.REMOVE_CONTACT](store, payload) {
    store.ref.child(payload.key).remove();
  },
};


export default new class ContactsStore extends Store {
  constructor() {
    super(Dispatcher, handlers);
    this._contacts = [];

    UserStore.addChangeListener(() => {
      if (this.ref) {
        this.ref.off('child_added', this.onChildAdded);
        this.ref.off('child_removed', this.onChildRemoved);
        this.ref.off('child_changed', this.onChildChanged);
      }

      this._contacts = [];
      const ref = UserStore.getPrivateStorage();

      if (ref) {
        this.ref = ref.child('contacts');
        this.ref.on('child_added', this.onChildAdded);
        this.ref.on('child_removed', this.onChildRemoved);
        this.ref.on('child_changed', this.onChildChanged);
      }

      this._emitChange();
    });
  }

  off(signal, listener) {
    this._emitter.off(signal, listener);
  }

  on(signal, listener) {
    this._emitter.on(signal, listener);
  }

  @autobind
  onChildAdded(snapshot) {
    const value = snapshot.val();
    value.$key = snapshot.key();
    this._contacts.push(value);
    this._emitter.emit(value.$key);
    this._emitChange();
  }

  @autobind
  onChildRemoved(snapshot) {
    const key = snapshot.key();
    this._contacts = this._contacts.filter(item => item.$key !== key);
    this._emitter.emit(key);
    this._emitChange();
  }

  @autobind
  onChildChanged(snapshot) {
    const index = this._contacts.findIndex(item => item.$key === snapshot.key());
    const value = snapshot.val();
    value.$key = snapshot.key();
    this._contacts[index] = value;
    this._emitter.emit(value.$key);
    this._emitChange();
  }

  get(key) {
    return this._contacts.find(item => item.$key === key);
  }

  getAll() {
    return this._contacts;
  }

  @autobind
  _handle(payload) {
    const handler = handlers[payload.type];
    if (handler) handler(this, payload);
  }
};


function fuckingUglyHack() {
   // HACK: This is not going to be like this with a good Dispatcher implementation
  setTimeout(() => goToList(), 0);
}
