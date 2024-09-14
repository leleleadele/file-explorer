import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import loadFromLocalStorage from './helpers/loadFromLocalStorage';
import { sliceStorageKey } from './consts';
import { hydrate } from './app/slice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const storedState = loadFromLocalStorage(sliceStorageKey);

if (storedState) {
  store.dispatch(hydrate(storedState));
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
