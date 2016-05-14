// Top navigation bar Component

import React from 'react';
import { Link } from 'common-accessible-components';

const NavigationBar = () => (
  <ul>
    <li>
      <Link href="/#/withdraw">Withdraw</Link>
    </li>
    <li>
      <Link href="/#/balance">Balance</Link>
    </li>
  </ul>
);

export default NavigationBar;
