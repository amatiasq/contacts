import 'react-mdl/extra/material.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '../tools/dispatcher';
import Router from '../router/router';
import routes from './routes';


ReactDOM.render(
  <Router config={routes} dispatcher={Dispatcher} />,
  document.getElementById('app-container')
);
