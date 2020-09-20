import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

import './index.css';
import Root from './Root';

ReactDOM.render(
    <Root>
        <App />
    </Root>,
    document.getElementById('root')
);
