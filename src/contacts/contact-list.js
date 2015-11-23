import React from 'react';
import FABButton from 'react-mdl/lib/fabbutton';
import Icon from 'react-mdl/lib/icon';
import ContactsStore from './contacts-store';
import { newContact } from '../app/actions';


export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.bindTo(ContactsStore, () => this._onChange());
  }

  bindTo(store, listener) {
    this.componentDidMount = () => store.addChangeListener(listener);
    this.componentWillUnmount = () => store.removeChangeListener(listener);
  }

  _onChange() {
    this.forceUpdate();
  }

  render() {
    const list = ContactsStore.getAll()
      .map(contact => <li>{contact.lastName}, {contact.firstName}</li>)

    return (
      <div className="contact-list-component">
        <ul>{list}</ul>
        <FABButton
            onClick={newContact}
            primary
            ripple
        >
          <Icon name="add" />
        </FABButton>
      </div>
    );
  }
}
