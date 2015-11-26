import autobind from 'decorators/autobind';
import React from 'react';
import Button from 'react-mdl/lib/Button';
import TextField from 'react-mdl/lib/Textfield';
import {
  login,
  register,
} from '../app/actions';


export default class ContactEdit extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.model = {};
    this.action = null;
  }

  @autobind
  onFormSubmit(event) {
    event.preventDefault();
    this.action(this.model.email, this.model.password);
  }

  @autobind
  onRegisterClick() {
    this.action = register;
  }

  @autobind
  onLoginClick() {
    this.action = login;
  }

  @autobind
  onEmailChange(event) {
    this.model.email = event.target.value;
  }

  @autobind
  onPasswordChange(event) {
    this.model.password = event.target.value;
  }

  render() {
    return (
      <form
        className="contact-edit-component"
        onSubmit={this.onFormSubmit}>

        <TextField
          label="Email"
          required
          type="email"
          onChange={this.onEmailChange}/>

        <TextField
          label="Password"
          required
          type="password"
          onChange={this.onPasswordChange}/>

        <Button
          primary
          raised
          ripple
          onClick={this.onRegisterClick}>
          Register
        </Button>

        <Button
          primary
          raised
          ripple
          onClick={this.onLoginClick}>
          Login
        </Button>
      </form>
    );
  }
}
