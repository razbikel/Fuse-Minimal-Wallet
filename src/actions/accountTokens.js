import { ACCOUNT_TOKENS } from './types';
import {BACKEND} from '../config';

export const fetchAccountTokens = (accountAddress, changeAccount) => {
    return (
        (dispatch) => {
            dispatch({ type: ACCOUNT_TOKENS.Fetching });
            return (
                fetch(`${BACKEND.BASE_URL}?module=${'account'}&action=${'tokenlist'}&address=${accountAddress}`)
                .then(res => res.json())
                .then( json => {
                    if (json.result.length === 0){
                        dispatch({
                            type: ACCOUNT_TOKENS.Success,
                            ...json,
                            changeAccount
                        })
                    }
                    else{
                        if (json.message !== 'OK'){
                            dispatch({
                                type: ACCOUNT_TOKENS.Error,
                                message: json.message
                            });
                        }
                        else {
                            dispatch({
                                type: ACCOUNT_TOKENS.Success,
                                ...json,
                                changeAccount
                            })
                        }
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