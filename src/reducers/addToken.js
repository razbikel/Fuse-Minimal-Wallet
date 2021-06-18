import {ADD_TOKEN} from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ADD_TOKEN = { token: undefined }

const addTokensReducer = (state = DEFAULT_ADD_TOKEN, action) => {
    switch (action.type){
        case ADD_TOKEN.Fetching:
            return { ...state, status: fetchStates.fetching };
        case ADD_TOKEN.Error:
            return { 
                ...state,
                status: fetchStates.error,
                message: action.message,
             };
        case ADD_TOKEN.Success:
            return { 
                ...state,
                status: fetchStates.success,  
                message: action.message, 
                token: action.result
             };
        default:
            return state;
    }
}

export default addTokensReducer;