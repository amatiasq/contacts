import autobind from 'decorators/autobind';
import React from 'react';
import Button from 'react-mdl/lib/Button';
import TextField from 'react-mdl/lib/Textfield';
import {
  login,
  connectFacebook,
  connectGoogle,
  connectTwitter,
  connectGithub,
} from '../app/actions';


export default class Login extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.model = {};
  }

  @autobind
  onFormSubmit(event) {
    event.preventDefault();
    login(this.model.email, this.model.password);
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
        className="login-component"
        onSubmit={this.onFormSubmit}>

        <div className="center">

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
            onClick={this.onLoginClick}>
            Register / Login
          </Button>

          <div className="connectors">
            <IconButton name="facebook-official" onClick={connectFacebook} />
            <IconButton name="google" onClick={connectGoogle} />
            <IconButton name="twitter" onClick={connectTwitter} />
            <IconButton name="github" onClick={connectGithub} />
          </div>
        </div>
      </form>
    );
  }
}


function IconButton(props) {
  const { name, ...rest } = props;
  return (
    <Button type="button" {...rest}>
      <i className={'fa fa-' + name} />
    </Button>
  );
}
