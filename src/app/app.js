import 'react-mdl/extra/material.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '../tools/dispatcher';
import Router from '../router/router';
import routes from './routes';


import { LOGIN } from './states';
import UserStore from '../login/user-store';

function onRouteChange({ state, redirect }) {
  if (!UserStore.isLoggedIn() && state.key !== LOGIN)
    redirect(LOGIN, { redirectTo: state });
}


ReactDOM.render(
  <Router
    config={routes}
    dispatcher={Dispatcher}
    onChange={onRouteChange} />,
  document.getElementById('app-container')
);
