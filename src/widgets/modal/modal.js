import React, { PropTypes } from 'react';


export default class Modal extends React.Component {
  propTypes = {
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  }

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
