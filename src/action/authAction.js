
import * as types from './types';

export const login = ({ username, password }) => {
    return {
        type: types.LOGIN,
        payload: {
            username,
            password
        }
    }
}

