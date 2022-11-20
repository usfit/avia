import React from 'react';
import ReactDOM from 'react-dom/client';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import Avia from './components/Avia';
import { requestTickets } from './actions';

import './style.scss';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(requestTickets());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Avia />
  </Provider>
);
