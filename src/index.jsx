import React from 'react';
import ReactDOM from 'react-dom';
import config from './config';

import App from './components/app';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
    <App />,
    document.querySelector('#main')
);
