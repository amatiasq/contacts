import Dispatcher from '../tools/dispatcher';
import { ROUTE_CHANGE } from '../router/router';
import * as states from './states';
import * as constants from './constants';


/*
 * Navigation
 */

export function newContact() {
  Dispatcher.dispatch({
    type: ROUTE_CHANGE,
    state: states.ADD_CONTACT,
  });
}

export function editContact(key) {
  Dispatcher.dispatch({
    type: ROUTE_CHANGE,
    state: states.EDIT_CONTACT,
    params: { key },
  });
}

export function goToList() {
  Dispatcher.dispatch({
    type: ROUTE_CHANGE,
    state: 'default',
  });
}


/*
 * Data management
 */

export function createContact(data) {
  Dispatcher.dispatch({
    type: constants.CREATE_CONTACT,
    data,
  });
}

export function saveContact(key, data) {
  Dispatcher.dispatch({
    type: constants.SAVE_CONTACT,
    key, data,
  });
}

export function removeContact(key) {
  Dispatcher.dispatch({
    type: constants.REMOVE_CONTACT,
    key,
  });
}


/*
 * Session management
 */

export function login(email, password) {
  Dispatcher.dispatch({
    type: constants.LOGIN,
    email, password,
  });
}

export function logout() {
  Dispatcher.dispatch({ type: constants.LOGOUT });
}

export function connectFacebook() {
  Dispatcher.dispatch({ type: constants.CONNECT_FACEBOOK });
}
export function connectGoogle() {
  Dispatcher.dispatch({ type: constants.CONNECT_GOOGLE });
}
export function connectTwitter() {
  Dispatcher.dispatch({ type: constants.CONNECT_TWITTER });
}
export function connectGithub() {
  Dispatcher.dispatch({ type: constants.CONNECT_GITHUB });
}
