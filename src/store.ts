import { compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

let storeInstance: any;

export default function configureStore() {
  if (storeInstance) {
    return storeInstance;
  }

  storeInstance = createStore(reducers, {}, compose(applyMiddleware(thunkMiddleware)));

  return storeInstance;
}
