import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Imports the Redux store.
import { store } from './app/store';
// Imports Provider from the react-redux package.
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/* Provider makes the Redux store available to all the components in App. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
