import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';
import { IStoreState } from './redux/reducers/index';

// Set default value for initialState to `{}` since the app will not use that and we only use `initialState` for testing purpose.

// Define type of __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

interface IRootProps {
    children: ReactNode;
    initialState?: IStoreState;
}

interface IRootProps {
    children: ReactNode;
    initialState?: IStoreState;
}

function Root({ children, initialState = {} as IStoreState }: IRootProps) {
    const globalStore = createStore(
        reducers,
        initialState,
        // using ! to ensure `composeEnhancer` is not null.
        composeEnhancers!(applyMiddleware(thunk))
    );
    return <Provider store={globalStore}>{children}</Provider>;
}

export default Root;
