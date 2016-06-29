import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';
import './app.rich-editor.css';

require('dotenv').config();

import * as UserActions from './actions/user';
import get from './utils/get_user';
import {get_settings} from './utils/settings';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
get_settings((settings) => {
  if (JSON.stringify(settings.user) !== '{}') {
    console.log(settings);
    store.dispatch(UserActions.set(settings.user))
  }
});
