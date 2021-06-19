import {ACCOUNT_TOKENS, UPDATE_ACCOUNT_TOKENS } from '../actions/types';
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

            // check if user add tokens, if yes the fetched tokens are not relevant
            // if case if of change account, replace tokens for sure
            let newTokens
            if (action.changeAccount){
                newTokens = action.result
            }
            else{
                newTokens = state.tokens.length < action.result.length ? action.result : state.tokens;
            }
            return { 
                ...state,
                status: fetchStates.success,  
                message: action.message, 
                tokens: newTokens
             };

        case UPDATE_ACCOUNT_TOKENS.Success:
            return { 
                ...state,
                status: fetchStates.success,  
                message: action.message, 
                tokens: action.tokens
                };
        default:
            return state;
    }
}

export default accountTokensReducer;