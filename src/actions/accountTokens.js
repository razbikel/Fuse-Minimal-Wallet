import { ACCOUNT_TOKENS } from './types';
import {BACKEND} from '../config';

export const fetchAccountTokens = (accountAddress) => {
    return (
        (dispatch) => {
            dispatch({ type: ACCOUNT_TOKENS.Fetching });
            return (
                fetch(`${BACKEND.BASE_URL}?module=${'account'}&action=${'tokenlist'}&address=${accountAddress}`)
                .then(res => res.json())
                .then( json => {
                    if (json.message !== 'OK'){
                        dispatch({
                            type: ACCOUNT_TOKENS.Error,
                            message: json.message
                        });
                    }
                    else {
                        dispatch({
                            type: ACCOUNT_TOKENS.Success,
                            ...json
                        })
                    }
    
                })
                .catch(error => dispatch({
                    type: ACCOUNT_TOKENS.Error,
                    message: error.message
                    }))
            )
        }
    )
}