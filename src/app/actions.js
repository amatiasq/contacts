import Dispatcher from '../tools/dispatcher';
import { ROUTE_CHANGE } from '../router/router';
import * as states from './states';
import * as constants from './constants';


export function newContact() {
  Dispatcher.dispatch({
    type: ROUTE_CHANGE,
    state: states.ADD_CONTACT,
  });
}


export function createContact(data) {
  Dispatcher.dispatch({
    type: constants.CREATE_CONTACT,
    data,
  });
}


export function goToList() {
  Dispatcher.dispatch({
    type: ROUTE_CHANGE,
    state: 'default',
  });
}
