import Dispatcher from '../flux/dispatcher';
import { ROUTE_CHANGE } from '../router/router';
import * as states from './states';
import * as constants from './constants';


export function newContact() {
  Dispatcher.dispatch({
    type: ROUTE_CHANGE,
    state: states.ADD_CONTACT,
  });
}
