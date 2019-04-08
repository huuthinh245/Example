import * as types from './types';

export const getMapData = (page) =>({
    type: types.MAP_FETCH,
    payload: {
        page
    }
})