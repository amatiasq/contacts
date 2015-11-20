import React from 'react';


export default class ContactEdit extends React.Component {
  constructor(props) {
    super(props);
    this.addContact = this.addContact.bind(this);
  }

  save(event) {
    let name = this.refs.name;
    ContactsActions.addContact(name.value);
    name.value = '';
  }

  render() {
    return (
      <div className="edit-contact">
      </div>
    );
  }
}
