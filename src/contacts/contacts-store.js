import Store from '../tools/store';
import Dispatcher from '../tools/dispatcher';
import { goToList } from '../app/actions';
import * as constants from '../app/constants';


export default new class ContactsStore extends Store {
  constructor() {
    super(Dispatcher);
    this._contacts = [];
  }

  getAll() {
    return this._contacts;
  }

  _handle(payload) {
    switch (payload.type) {
      case constants.CREATE_CONTACT:
        this._contacts.push(payload.data);
        this._emitChange();

        // HACK: This is not going to be like this with a good Dispatcher implementation
        setTimeout(() => goToList(), 0);

        break;
    }
  }
}
