import { ACCOUNT_TRANSFERS } from './types';
import {BACKEND} from '../config';

export const fetchAccountTransfers = (accountAddress) => {
    return (
        (dispatch) => {
            dispatch({ type: ACCOUNT_TRANSFERS.Fetching });
            return (
                fetch(`${BACKEND.BASE_URL}?module=${'account'}&action=${'tokentx'}&address=${accountAddress}`)
                .then(res => res.json())
                .then( json => {
                    if (json.message !== 'OK'){
                        dispatch({
                            type: ACCOUNT_TRANSFERS.Error,
                            message: json.message
                        });
                    }
                    else {
                        dispatch({
                            type: ACCOUNT_TRANSFERS.Success,
                            ...json
                        })
                    }
    
                })
                .catch(error => dispatch({
                    type: ACCOUNT_TRANSFERS.Error,
                    message: error.message
                    }))
            )
        }
    )
}