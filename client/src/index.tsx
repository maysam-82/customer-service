import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducers from './redux/reducers';
import App from './containers/App';

import './index.css';

// Define type of __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// To be sure that redux dev tool works only in `development` mode.
const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose;

const globalStore = createStore(
    reducers,
    // using ! to ensure `composeEnhancer` is not null.
    composeEnhancers!(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={globalStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);
