import { combineReducers } from 'redux';
import travel from './travel';
import wallet from './wallet';

const rootReducer = combineReducers({ travel, wallet });

export default rootReducer;
