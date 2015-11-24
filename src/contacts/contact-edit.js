import React from 'react';
import autobind from 'decorators/autobind';
import Button from 'react-mdl/lib/Button';
import TextField from 'react-mdl/lib/Textfield';
import { createContact } from '../app/actions';


export default class ContactEdit extends React.Component {
  constructor(props) {
    super(props);
    this.model = {};
    this.onFirstNameChange = this.onModelChange.bind(this, 'firstName');
    this.onLastNameChange = this.onModelChange.bind(this, 'lastName');
    this.onPhoneChange = this.onModelChange.bind(this, 'phone');
    this.onEmailChange = this.onModelChange.bind(this, 'email');
  }

  save() {
    createContact(this.model);
  }

  @autobind
  onFormSubmit(event) {
    event.preventDefault();
    this.save();
  }

  onModelChange(key, event) {
    this.model[key] = event.target.value;
  }

  render() {
    return (
      <form
        className="edit-contact"
        onSubmit={this.onFormSubmit}>

        <TextField
          floatingLabel
          label="First name"
          onChange={this.onFirstNameChange}/>

        <TextField
          floatingLabel
          label="Last name"
          onChange={this.onLastNameChange}/>

        <TextField
          floatingLabel
          label="Phone"
          onChange={this.onPhoneChange}/>

        <TextField
          floatingLabel
          label="Email"
          onChange={this.onEmailChange}/>

        <Button ripple>Save</Button>
      </form>
    );
  }
}
