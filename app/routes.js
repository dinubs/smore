import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import New from './containers/New'; 
import About from './containers/About'; 

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='/new' component={New} />
    <Route path='/about' component={About} />
  </Route>
);
