import { UPLOAD_TOKEN_TRANSFER_MAP } from './types';

export const uploadMap = (token_transfer_map) => {
    return (
        (dispatch) => {
            return new Promise((resolve, reject) => {
                resolve(
                    dispatch({
                        type: UPLOAD_TOKEN_TRANSFER_MAP.Success,
                        map: token_transfer_map
                    })
                )
            })
        }
    )
}