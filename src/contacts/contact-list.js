import React, { PropTypes } from 'react';
import autobind from 'decorators/autobind';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from 'react-mdl/lib/Icon';
import IconButton from 'react-mdl/lib/IconButton';
import ContactsStore from './contacts-store';
import {
  newContact,
  editContact,
  removeContact,
} from '../app/actions';


export default class ContactList extends React.Component {
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
    const list = ContactsStore.getAll().map(contact => <ContactItem contact={contact} key={contact.$key} />);

    return (
      <div className="contact-list-component">
        <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">{list}</table>

        <FABButton
          className="add-contact"
          primary
          ripple
          onClick={newContact}>
          <Icon name="add" />
        </FABButton>
      </div>
    );
  }
}


class ContactItem extends React.Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
  }

  @autobind
  onSelect() {
    editContact(this.props.contact.$key);
  }

  @autobind
  onRemove(event) {
    event.stopPropagation();
    removeContact(this.props.contact.$key);
  }

  render() {
    const { contact } = this.props;

    return (
      <tr>
        <td
          className="mdl-data-table__cell--non-numeric"
          onClick={this.onSelect}>
          {contact.firstName} {contact.lastName}

          <IconButton
            className="remove-contact"
            name="delete"
            onClick={this.onRemove}/>
        </td>
      </tr>
    );
  }
}
