import React from 'react';


export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overlay">
        <div className="modal-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
