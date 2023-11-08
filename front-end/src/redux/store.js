import createSagaMiddleware from '@redux-saga/core';
import {persistStore} from 'redux-persist';
import { configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootSaga from './saga/saga';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware,thunk,logger]

console.log("store is called");
export const store = configureStore({
    reducer : rootReducer,
    middleware: [...middleware],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default {store,persistor};