import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './tab.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store, { history } from './store/store';
import { ConnectedRouter } from 'connected-react-router';
import { HashRouter } from 'react-router-dom';
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HashRouter basename=''>
        <App />
      </HashRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
