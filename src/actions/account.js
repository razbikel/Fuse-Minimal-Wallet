import { ACCOUNT } from './types';
import {BACKEND} from '../config';

export const fetchAccountAddress = (accountAddress) => {
    return (
        (dispatch) => {
            dispatch({ type: ACCOUNT.LoggedInFetching });
            return (
                fetch(`${BACKEND.BASE_URL}?module=${'account'}&action=${'balance'}&address=${accountAddress}`)
                .then(res => res.json())
                .then( json => {
                    if (json.message !== 'OK'){
                        dispatch({
                            type: ACCOUNT.LoggedInError,
                            message: json.message,
                            loggedIn: false,
                        });
                    }
                    else {
                        dispatch({
                            type: ACCOUNT.LoggedInSuccess,
                            ...json,
                            loggedIn: true,
                            accountAddress
                        })
                    }
    
                })
                .catch(error => dispatch({
                    type: ACCOUNT.LoggedInError,
                    message: error.message
                    }))
            )
        }
    )
}
