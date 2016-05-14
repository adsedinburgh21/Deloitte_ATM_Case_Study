// App entry point

import React from 'react';
import { Router } from 'react-router';
import { hashHistory } from 'react-router';
import { render } from 'react-dom';
import routes from './router/AppRouter';

const rootElement = document.querySelector( '#reactOutput' );

render(
  <Router routes={ routes } history={ hashHistory } />, rootElement
);
