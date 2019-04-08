
//@flow
import * as types from './types';

type loginType = {
    username: any,
    password: any,
}
export const login = ({ username, password }: loginType) => {
    return {
        type: types.LOGIN,
        payload: {
            username,
            password
        }
    }
}

