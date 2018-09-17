import { takeLatest } from 'redux-saga';
import { call,put } from 'redux-saga/effects'
import { getUserName, getCurrentUser, getCreateRoom } from './services';

function* getUserName_(action) {
    const username = yield call(getUserName, action.username);
    yield put({ type: 'SET_USERNAME', username });
}

function* getCurrentUser_(action) {
    const currentUser = yield call(getCurrentUser, action.currentUser);
    yield put({ type: 'SET_CURRENT_USER', currentUser });
}

function* getCreateRoom_(action) {
    const room = yield call(getCreateRoom, action);
    yield put({ type: 'SET_CREATE_ROOM', room });
}

export default function* sagas() {
    yield takeLatest('GET_USERNAME', getUserName_);
    yield takeLatest('GET_CURRENT_USER', getCurrentUser_);
    yield takeLatest('GET_CREATE_ROOM', getCreateRoom_);
}