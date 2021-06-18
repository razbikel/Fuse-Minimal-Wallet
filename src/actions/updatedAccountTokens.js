import { UPDATE_ACCOUNT_TOKENS } from './types';

export const sendUpdatedAccountTokens = (accountTokens) => {
    return (
        (dispatch) => {
            dispatch({ type: UPDATE_ACCOUNT_TOKENS.Fetching });
            return new Promise((resolve, reject) => {
                resolve(
                    dispatch({
                        type: UPDATE_ACCOUNT_TOKENS.Success,
                        tokens: accountTokens
                    })
                )
            })
        }
    )
}