/* eslint "react/display-name":0 */

// This rule is detecting a loop where there's no loop
/* eslint "react/jsx-key":0 */

import React from 'react';
import Modal from '../widgets/modal/modal';
import ContactsList from '../contacts/contact-list';
// import ContactsView from '../contacts/contact-view';
import ContactEdit from '../contacts/contact-edit';
import { goToList } from './actions';


import {
  ADD_CONTACT,
//  VIEW_CONTACT,
  EDIT_CONTACT,
} from './states';


export default {
  default: {
    url: '/',
    template: <ContactsList />,
  },

  [ADD_CONTACT]: {
    url: '/new',
    template: (
      <div>
        <ContactsList />
        <Modal onClose={goToList}>
          <ContactEdit isNew />
        </Modal>
      </div>
    ),
  },

/*
  [VIEW_CONTACT]: {
    url: '/contact/{key}',
    handler: params => (
      <div>
        <ContactsList />
        <Modal><ContactView id={params.key} /></Modal>
      </div>
    ),
  },
*/

  [EDIT_CONTACT]: {
    url: '/contact/{key}/edit',
    handler: params => (
      <div>
        <ContactsList />
        <Modal onClose={goToList}>
          <ContactEdit id={params.key} />
        </Modal>
      </div>
    ),
  },
};
