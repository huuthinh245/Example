import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects';
import { fetchApi } from '../api/fetchData';
import * as types from '../action/types';

function* fetchSaga({ payload }) {
   const res = yield call(fetchApi);
   const { status } = res;
   if(status === 200) {
       yield put ({ type: types.FETCH_SUCCESS, payload: res.data.movies })
   }else {
       yield put({ type: types.FETCH_FAIL });
   }

}

export default function* watchSaga(){
    yield  takeLatest(types.FETCH_START, fetchSaga)
}

