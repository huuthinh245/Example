import Immutable from 'immutable';
import * as types from 'action/types';

const initialState = Immutable.fromJS({
    userInfo: {},
    loading: false
})

export const userReducer = (state= initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return state.set('loading', true);
        case types.LOGIN_SUCCESS:
            return state.set('loading', false)
        case types.LOGIN_FAIL:
            return state.set('loading', false);
        default:
            return state;
    }
}