import React from 'react';
import RouterStore from './router-store';
import { isDispatcher } from '../tools/dispatcher';


export { ROUTE_CHANGE } from './router-constants';


const attributeValidation = {
  config: React.PropTypes.object.isRequired,
  dispatcher(props, name) {
    if (!isDispatcher(props[name]))
      return new Error('Router\'s "dispatcher" attribute should be a Flux dispatcher');
  },
};


export default class Router extends React.Component {
  static propTypes: attributeValidation

  constructor(props) {
    super(props);
    this._store = new RouterStore(this.props.dispatcher, this.props.config);
    this._store.loadState('default');

    this.bindTo(this._store, () => this._onChange());
    this.state = this._getState();
  }

  bindTo(store, listener) {
    this.componentDidMount = () => store.addChangeListener(listener);
    this.componentWillUnmount = () => store.removeChangeListener(listener);
  }

  _getState() {
    return {
      state: this._store.state,
      params: this._store.params,
    };
  }

  _onChange() {
    this.setState(this._getState());
  }

  render() {
    const state = this.state.state;
    let template = state.template;

    // TODO: Update browser url

    if (!template)
      template = state.handler(state.params);

    return <div id="flux-router">{template}</div>;
  }
}
