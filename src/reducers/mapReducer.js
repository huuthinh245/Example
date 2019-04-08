import Immutable from 'immutable';
import * as types from 'action/types';
import { generateRandomPoints } from 'screens/Maps/generator'
const initialState = Immutable.fromJS({
    data: [],
    loading: false
})
const italyCenterLatitude = 10,
      italyCenterLongitude = 108,
      radius = 600000
export const mapReducer = (state= initialState, action) => {
    switch (action.type) {
        case types.MAP_FETCH:
            return state.set('loading', true);
        case types.MAP_FETCH_SUCCESS:
            const arr = action.payload.data.map(item => {
                return {
                    id: `pin${item.id}`,
                    location: {
                        latitude: item.coordinate.lat,
                        longitude: item.coordinate.lng
                    }
                }
            });
            return state.merge({ data: state.toJS().data.concat(arr) }).set('loading', false)
        case types.MAP_FETCH_FAIL:
            return state.set('loading', false);
        case 'LOADMORE':
        const pins = generateRandomPoints({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50, state.toJS().data.length);
        return state.merge({ data: state.toJS().data.concat(pins) }).set('loading')
        default:
            return state;
    }
}

const reselect = state => key => state.get('map').toJS()[key];

export const selectors = {
    getData: state => reselect(state)('data'),
    getLoading: state => reselect(state)('loading')
}
