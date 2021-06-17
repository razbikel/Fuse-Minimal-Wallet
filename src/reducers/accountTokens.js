import {ACCOUNT_TOKENS} from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT_TOKENS = { tokens: [] }

const accountTokensReducer = (state = DEFAULT_ACCOUNT_TOKENS, action) => {
    switch (action.type){
        case ACCOUNT_TOKENS.Fetching:
            return { ...state, status: fetchStates.fetching };
        case ACCOUNT_TOKENS.Error:
            return { 
                ...state,
                status: fetchStates.error,
                message: action.message,
             };
        case ACCOUNT_TOKENS.Success:
            return { 
                ...state,
                status: fetchStates.success,  
                message: action.message, 
                tokens: action.result
             };
        default:
            return state;
    }
}

export default accountTokensReducer;