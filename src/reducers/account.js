import {ACCOUNT, UPLOAD_TOKEN_TRANSFER_MAP} from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT = { loggedIn: false, map: {} }

const accountReducer = (state = DEFAULT_ACCOUNT, action) => {
    switch (action.type){
        case ACCOUNT.LoggedInFetching:
            return { ...state, status: fetchStates.fetching };
        case ACCOUNT.LoggedInError:
            return { 
                ...state,
                status: fetchStates.error,
                loggedIn: action.loggedIn,
                message: action.message,
                accountAddress: null,
                result: null
             };
        case ACCOUNT.LoggedInSuccess:
            return { 
                ...state,
                status: fetchStates.success, 
                loggedIn: action.loggedIn, 
                message: action.message,
                accountAddress: action.accountAddress, 
                result: action.result
             };
        case UPLOAD_TOKEN_TRANSFER_MAP.Success:
            return {
                ...state,
                map: action.map
            };
        default:
            return state;
    }
}

export default accountReducer;