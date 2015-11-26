import 'react-mdl/extra/material.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '../tools/dispatcher';
import Router, { ROUTER_RELOAD } from '../router/router';
import routes from './routes';


import { LOGIN } from './states';
import UserStore from '../login/user-store';

function onRouteChange({ state, redirect }) {
  if (UserStore.isLoggedIn() && state.key === LOGIN)
    redirect('default');

  if (!UserStore.isLoggedIn() && state.key !== LOGIN)
    redirect(LOGIN, { redirectTo: state });
}

UserStore.addChangeListener(() => Dispatcher.dispatch({ type: ROUTER_RELOAD }));


ReactDOM.render(
  <Router
    config={routes}
    dispatcher={Dispatcher}
    onChange={onRouteChange} />,
  document.getElementById('app-container')
);
