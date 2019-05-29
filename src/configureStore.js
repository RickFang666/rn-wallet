import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import applyAppStateListener from 'redux-enhancer-react-native-appstate';
import { apiMiddleware } from 'redux-api-middleware';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/AsyncStorage';
import { AsyncStorage } from 'react-native';
import rootReducer from './reducers';

const reducer = compose(mergePersistedState())(rootReducer);

const storage = adapter(AsyncStorage);

const enhancer = compose(
  applyAppStateListener(),
  applyMiddleware(apiMiddleware, thunk),
  persistState(storage, '@TRIOWalletStore'),
);

export default () => createStore(reducer, enhancer);
