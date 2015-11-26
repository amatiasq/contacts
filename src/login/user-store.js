import autobind from 'decorators/autobind';
import Firebase from 'firebase';
import Store from '../tools/store';
import Dispatcher from '../tools/dispatcher';
import * as constants from '../app/constants';
import { goToList } from '../app/actions';


const storage = new Firebase('https://amq-contacts.firebaseio.com/');


const handlers = {
  [constants.LOGIN](store, payload) {
    const data = {
      email: payload.email,
      password: payload.password,
    };

    storage.authWithPassword(data).catch(error => {
      if (error.code === 'INVALID_USER')
        return storage.createUser(data);
      throw error;
    })
    .then(goToList)
    /* eslint no-alert:1 */
    .catch(error => alert(error.message));
  },

  [constants.LOGOUT]() {
    storage.unauth();
    setTimeout(goToList, 0);
  },

  [constants.CONNECT_FACEBOOK]() {
    storage.authWithOAuthRedirect('facebook', { scope: 'email,user_friends' });
  },
  [constants.CONNECT_GOOGLE]() {
    storage.authWithOAuthRedirect('google');
  },
  [constants.CONNECT_TWITTER]() {
    storage.authWithOAuthRedirect('twitter');
  },
  [constants.CONNECT_GITHUB]() {
    storage.authWithOAuthRedirect('github');
  },
};


export default new class UserStore extends Store {
  constructor() {
    super(Dispatcher, handlers);
    this._contacts = [];
    storage.onAuth(this.onAuth);
  }

  addChangeListener(listener) {
    super.addChangeListener(listener);
    listener();
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

  getPrivateStorage() {
    const auth = this.getData();
    if (auth)
      return storage.child('private/' + auth.uid);
  }

  @autobind
  _handle(payload) {
    const handler = handlers[payload.type];
    if (handler) handler(this, payload);
  }
};
