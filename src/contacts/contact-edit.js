import React from 'react';
import Button from 'react-mdl/lib/Button';
import TextField from 'react-mdl/lib/Textfield';
import { createContact } from '../app/actions';


export default class ContactEdit extends React.Component {
  constructor(props) {
    super(props);
    this.model = {};
  }

  save() {
    createContact(this.model);
  }

  render() {
    return (
      <form
          className="edit-contact"
          onSubmit={event => event.preventDefault()}
      >
        <TextField
            floatingLabel
            label="First name"
            onChange={event => this.model.firstName = event.target.value}
        />
        <TextField
            floatingLabel
            label="Last name"
            onChange={event => this.model.lastName = event.target.value}
        />
        <TextField
            floatingLabel
            label="Phone"
            onChange={event => this.model.phone = event.target.value}
        />
        <TextField
            floatingLabel
            label="Email"
            onChange={event => this.model.email = event.target.value}
        />
        <Button
            onClick={event => this.save()}
            ripple
        >
            Save
        </Button>
      </form>
    );
  }
}
