import {ACCOUNT_TRANSFERS} from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT_TRANSFERS = { transfers: [] }

const accountTransfersReducer = (state = DEFAULT_ACCOUNT_TRANSFERS, action) => {
    switch (action.type){
        case ACCOUNT_TRANSFERS.Fetching:
            return { ...state, status: fetchStates.fetching };
        case ACCOUNT_TRANSFERS.Error:
            return { 
                ...state,
                status: fetchStates.error,
                message: action.message,
             };
        case ACCOUNT_TRANSFERS.Success:
            return { 
                ...state,
                status: fetchStates.success,  
                message: action.message, 
                transfers: action.result
             };
        default:
            return state;
    }
}

export default accountTransfersReducer;