
import * as types from './types';

export const fetchData = () => {
    return {
        type: types.FETCH_START
    }
} 

export const fetchDataWithPayload = (payload) => {
    return {
        type: types.FETCH_START,
        payload
    }
}



