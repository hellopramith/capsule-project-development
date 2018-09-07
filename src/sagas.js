import { takeLatest } from 'redux-saga';
import { call,put } from 'redux-saga/effects'
import { getUserName, getChat, getCurrentUser } from './services';

function* getUserName_(action) {
    const username = yield call(getUserName, action.username);
    yield put({ type: 'SET_USERNAME', username });
}

function* getChat_(action) {
    const messages = yield call(getChat, action.userId);
    yield put({ type: 'SET_CHAT', messages });
}

function* getCurrentUser_(action) {
    const currentUser = yield call(getCurrentUser, action.userId);
    yield put({ type: 'SET_CURRENT_USER', currentUser });
}

export default function* sagas() {
    yield takeLatest('GET_USERNAME', getUserName_);
    yield takeLatest('GET_CHAT', getChat_);
    yield takeLatest('GET_CURRENT_USER', getCurrentUser_);
}