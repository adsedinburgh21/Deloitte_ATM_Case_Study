// React-router routes module

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Atm from '../components/atm';
import Main from '../components/main';
import Withdraw from '../components/withdraw';
import Balance from '../components/balance';

// Import all the components
module.exports = [
  <Route path="/" component={ Atm }>
  	<IndexRoute component={ Main } />
    <Route path="withdraw" component={ Withdraw } />
    <Route path="balance" component={ Balance } />
  </Route>
];
