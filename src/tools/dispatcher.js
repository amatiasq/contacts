import { Dispatcher } from '../node_modules/flux/dist/Flux';


export default new Dispatcher();


export function isDispatcher(value) {
  return value instanceof Dispatcher;
}
