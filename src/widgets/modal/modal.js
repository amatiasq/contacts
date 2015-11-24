import autobind from 'decorators/autobind';
import React, { PropTypes } from 'react';
import Overlay from '../overlay/overlay';


export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    onClose: PropTypes.func,
  }

  @autobind
  onModalClick(event) {
    event.stopPropagation();
  }

  @autobind
  onOverlayClick() {
    this.props.onClose();
  }

  render() {
    return (
      <div className="modal-component">
        <Overlay onClick={this.onOverlayClick}>
          <div
            className="modal-container"
            onClick={this.onModalClick}>
            {this.props.children}
          </div>
        </Overlay>
      </div>
    );
  }
}
