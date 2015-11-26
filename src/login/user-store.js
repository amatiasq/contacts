import autobind from 'decorators/autobind';
import Firebase from 'firebase';
import Store from '../tools/store';
import Dispatcher from '../tools/dispatcher';
import * as constants from '../app/constants';


const storage = new Firebase('https://amq-contacts.firebaseio.com/contacts/');


const handlers = {
  [constants.LOGIN](store, payload) {
    storage.authWithPassword({
      email: payload.email,
      password: payload.password,
    }, function(error, data) {
      debugger;
    });
  },

  [constants.REGISTER](store, payload) {
    storage.createUser({
      email: payload.email,
      password: payload.password,
    }, function(error, data) {
      debugger;
    });
  },
};


export default new class ContactsStore extends Store {
  constructor() {
    super(Dispatcher, handlers);
    this._contacts = [];
    storage.onAuth(this.onAuth);
  }

  @autobind
  onAuth() {
    this._emitChange();
  }

  getData() {
    return storage.getAuth();
  }

  isLoggedIn() {
    return !!storage.getAuth();
  }

  @autobind
  _handle(payload) {
    const handler = handlers[payload.type];
    if (handler) handler(this, payload);
  }
};
