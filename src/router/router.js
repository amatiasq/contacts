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
    this._onChange = this._onChange.bind(this);
    this._onUserNavigation = this._onUserNavigation.bind(this);
    this._store.loadUrl(window.location.pathname);
  }

  _onChange() {
    this.forceUpdate();
  }

  _onUserNavigation() {
    this._store.loadUrl(window.location.pathname);
  }

  componentDidMount() {
    window.addEventListener('popstate', this._onUserNavigation);
    this._store.addChangeListener(this._onChange);
    this._store.loadUrl(window.location.pathname);
  }

  componentWillUnmount() {
    this._store.removeChangeListener(this._onChange);
    window.removeEventListener('popstate', this._onUserNavigation);
  }

  render() {
    const state = this._store.state;
    const params = this._store.params;
    const url = this._store.getUrl(state, params);
    let template = state.template;

    if (window.location.pathname !== url)
      window.history.pushState(null, window.title, url);

    if (!template)
      template = state.handler(params);

    return <div id="flux-router">{template}</div>;
  }
}
