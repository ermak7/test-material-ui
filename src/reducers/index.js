import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import favorite from './favorite';

export default combineReducers({
    routing: routerReducer,
    favorite,
});