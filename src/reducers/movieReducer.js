import Immutable from 'immutable';
import * as types from 'action/types';

const initialState = Immutable.fromJS({
    movie: [],
    loading: false
})

export const movieReducer = (state= initialState, action) => {
    switch (action.type) {
        case types.FETCH_START:
            return state.set('loading', true);
        case types.FETCH_SUCCESS:
            return state.merge({ movie: action.payload }).set('loading', false)
        case types.FETCH_FAIL:
            return state.set('loading', false);
        default:
            return state;
    }
}