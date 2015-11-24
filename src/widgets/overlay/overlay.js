import React, { PropTypes } from 'react';
import classnames from 'classnames';


export default class Overlay extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    className: PropTypes.string,
  }

  render() {
    const { children, className, ...props } = this.props;
    props.className = classnames('overlay-component', className);
    return <div {...props}>{children}</div>;
  }
}
