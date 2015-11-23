import 'react-mdl/extra/material.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '../tools/dispatcher';
import Router from '../router/router';
import Modal from '../widgets/modal/modal';
import ContactsList from '../contacts/contact-list';
// import ContactsView from '../contacts/contact-view';
import ContactEdit from '../contacts/contact-edit';


import {
  ADD_CONTACT,
  VIEW_CONTACT,
  EDIT_CONTACT,
} from './states';


const config = {
  default: {
    url: '/',
    template: <ContactsList />,
  },

  [ADD_CONTACT]: {
    url: '/new',
    template: (
      <div>
        <ContactsList />
        <Modal><ContactEdit isNew={true} /></Modal>
      </div>
    ),
  },
/*
  [VIEW_CONTACT]: {
    url: '/contact/{id}',
    handler: params => (
      <div>
        <ContactsList />
        <Modal><ContactView id={params.id} /></Modal>
      </div>
    ),
  },

  [EDIT_CONTACT]: {
    url: '/contact/{id}/edit',
    handler: params => (
      <div>
        <ContactsList />
        <Modal><ContactEdit id={params.id} /></Modal>
      </div>
    ),
  }
*/
};


ReactDOM.render(
  <Router dispatcher={Dispatcher} config={config} />,
  document.getElementById('app-container')
);
