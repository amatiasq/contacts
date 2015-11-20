import React from 'react';
import ContactsStore from './contacts-store';
import { newContact } from '../app/actions';


export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this.bindTo(ContactsStore, () => this._onChange());
  }

  bindTo(store, listener) {
    this.componentDidMount = () => store.addChangeListener(listener);
    this.componentWillUnmount = () => store.removeChangeListener(listener);
  }

  _onChange() {
    this.setState(this._getState());
  }

  _getState() {
    return { contacts: ContactsStore.getAll() };
  }

  render() {
    let list = this.state.contacts.map(contact => <li>{contact.name}</li>);

    return (
      <div>
        <ul>{list}</ul>
        <button className="add-contact" onClick={newContact}>+</button>
      </div>
    );
  }
}
