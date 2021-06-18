import { ADD_TOKEN } from './types';
import {BACKEND} from '../config';

export const fetchToken = (tokenAddress) => {
    return (
        (dispatch) => {
            dispatch({ type: ADD_TOKEN.Fetching });
            return (
                fetch(`${BACKEND.BASE_URL}?module=${'token'}&action=${'getToken'}&contractaddress=${tokenAddress}`)
                .then(res => res.json())
                .then( json => {
                    if (json.message !== 'OK'){
                        dispatch({
                            type: ADD_TOKEN.Error,
                            message: json.message
                        });
                    }
                    else {
                        dispatch({
                            type: ADD_TOKEN.Success,
                            ...json
                        })
                    }
    
                })
                .catch(error => dispatch({
                    type: ADD_TOKEN.Error,
                    message: error.message
                    }))
            )
        }
    )
}