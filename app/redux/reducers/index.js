import {combineReducers} from 'redux';
import todoReducers from './todoReducers.js';
import counterReducers from './counterReducers';
import olamiReducers from './olamiReducers';

export default combineReducers(Object.assign({}, todoReducers, counterReducers, olamiReducers));