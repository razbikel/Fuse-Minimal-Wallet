import {combineReducers} from 'redux';
import accountReducer from './account';
import accountTokensReducer from './accountTokens';
import accountTransfersReducer from './accountTransfers'
import addTokensReducer from './addToken';

export default combineReducers({
    account: accountReducer,
    accountTokens: accountTokensReducer,
    accountTransfers: accountTransfersReducer,
    addToken: addTokensReducer
});