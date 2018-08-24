import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import indexReducer from '../reducers/index.js';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(indexReducer, {});

export default store;