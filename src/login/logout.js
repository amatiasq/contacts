import React from 'react';
import Button from 'react-mdl/lib/Button';
import { logout } from '../app/actions';


export default class Logout extends React.Component {
  render() {
    return (
      <Button
        className="logout-component"
        raised
        ripple
        onClick={logout}>
        Logout
      </Button>
    );
  }
}
