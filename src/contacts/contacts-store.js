import Store from '../flux/store';
import Dispatcher from '../flux/dispatcher';
import * as ContactsConstants from './contacts-constants';


class ContactsStore extends Store {
  constructor() {
    super();
    this._contacts = [];
  }

  getAll() {
    return this._contacts;
  }

  handle(payload) {
    switch (payload.type) {
      case ContactsConstants.ADD_CONTACT:
        this._contacts.push({ name: payload.name });
        this.emitChange();
        break;
    }
  }
}


let store = new ContactsStore();
Dispatcher.register(payload => store.handle(payload));
export default store;


