import React from 'react';
import { createContact } from '../app/actions';


export default class ContactEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  save() {
    createContact({
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      phone: this.refs.phone.value,
      email: this.refs.email.value,
    });
  }

  render() {
    return (
      <form className="edit-contact" onSubmit={event => event.preventDefault()}>
        <ul>
          <li><input type="text" placeholder="First name" ref="firstName" /></li>
          <li><input type="text" placeholder="Last name" ref="lastName" /></li>
          <li><input type="phone" placeholder="Phone" ref="phone" /></li>
          <li><input type="email" placeholder="Email" ref="email" /></li>
        </ul>
        <button onClick={event => this.save()}>Save</button>
      </form>
    );
  }
}
