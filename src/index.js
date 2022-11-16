import React from 'react';
import { createRoot } from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducer';
import Avia from './components/Avia';

import './style.scss';

const store = createStore(reducer);

const update = () => {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <Avia />
    </Provider>
  );
};

update();
store.subscribe(update);
