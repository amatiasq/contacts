import React from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '../tools/dispatcher';
import Router from '../router/router';
import ContactsList from '../contacts/contact-list';
import ContactsView from '../contacts/contact-view';
import ContactsEdit from '../contacts/contact-edit';


import {
  ADD_CONTACT,
  VIEW_CONTACT,
  EDIT_CONTACT
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
        <ContactEdit isNew={true} />
      </div>
    ),
  },

  [VIEW_CONTACT]: {
    url: '/contact/{id}',
    handler: params => (
      <div>
        <ContactsList />
        <ContactView id={params.id} />
      </div>
    ),
  }

  [EDIT_CONTACT]: {
    url: '/contact/{id}/edit',
    handler: params => (
      <div>
        <ContactsList />
        <ContactEdit id={params.id} />
      </div>
    ),
  }
});


ReactDOM.render(
  <Router dispatcher={Dispatcher} config={config} />,
  document.getElementById('app-container')
);
