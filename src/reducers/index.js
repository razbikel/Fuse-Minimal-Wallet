import {combineReducers} from 'redux';
import accountReducer from './account';
import accountTokensReducer from './accountTokens';

export default combineReducers({
    account: accountReducer,
    accountTokens: accountTokensReducer
});