import React from 'react';


export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal-component overlay valign-wrapper">
        <div className="modal-container valign">
          {this.props.children}
        </div>
      </div>
    );
  }
}
