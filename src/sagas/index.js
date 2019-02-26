import { all, takeLatest, fork } from 'redux-saga/effects';
import fetchSaga from './fetchSaga';
import loginSaga from './loginSaga';
import * as types from '../action/types'
export default function* watch() {
    yield all([fork(fetchSaga), fork(loginSaga)])
}