import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects';
import { mapApi } from '../api/mapApi';
import * as types from '../action/types';

function* mapSaga({ payload }) {
    const { page } = payload;
    const res = yield call(mapApi, page);
    const { status } = res;
    console.log(res);
    if (status === 200) {
        yield put({ type: types.MAP_FETCH_SUCCESS, payload: { data: res.data } })
    } else {
        yield put({ type: types.MAP_FETCH_FAIL });
    }

}

export default function* watchMapSaga() {
    yield takeLatest(types.MAP_FETCH, mapSaga)
}

