import React from 'react';
import autobind from 'decorators/autobind';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from 'react-mdl/lib/Icon';
import ContactsStore from './contacts-store';
import { newContact } from '../app/actions';


export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.bindTo(ContactsStore, () => this._onChange());
  }

  componentDidMount() {
    ContactsStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    ContactsStore.removeChangeListener(this.onChange);
  }

  @autobind
  onChange() {
    this.forceUpdate();
  }

  render() {
    const list = ContactsStore.getAll()
      .map(contact => <li>{contact.lastName}, {contact.firstName}</li>);

    return (
      <div className="contact-list-component">
        <ul>{list}</ul>
        <FABButton
          primary
          ripple
          onClick={newContact}>
          <Icon name="add" />
        </FABButton>
      </div>
    );
  }
}
