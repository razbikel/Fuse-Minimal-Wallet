import {combineReducers} from 'redux';
import accountReducer from './account';
import accountTokensReducer from './accountTokens';
import accountTransfersReducer from './accountTransfers'

export default combineReducers({
    account: accountReducer,
    accountTokens: accountTokensReducer,
    accountTransfers: accountTransfersReducer
});