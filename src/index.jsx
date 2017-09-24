import React from 'react';
import ReactDOM from 'react-dom';
import config from './config';

import App from './components/app';

if (module.hot) {
  module.hot.accept();
}

// Raven.config('https://b79178955a454bfab27afb2089fe8ed5@sentry.io/199214').install();

ReactDOM.render(
    <App />,
    document.querySelector('#main')
);
