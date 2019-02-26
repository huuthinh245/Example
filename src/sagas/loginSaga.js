import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects';
import { fetchApi } from '../api/loginApi';
import * as types from '../action/types';
import NavigationService from 'navigation/NavigationService';
function* loginSaga({ payload }) {
    console.log(payload);
    const { username, password } = payload;
   const res = yield call(fetchApi, { username, password });
   const { status } = res;
   console.log(res);
   if(status === 200) {
       yield put ({ type: types.LOGIN_SUCCESS })
       NavigationService.navigate('Main');
   }else {
       yield put({ type: types.LOGIN_FAIL });
   }

}

export default function* watchLoginSaga(){
    yield  takeLatest(types.LOGIN, loginSaga)
}

