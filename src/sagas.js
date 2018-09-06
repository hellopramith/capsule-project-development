import { takeLatest } from 'redux-saga';
import { call,put } from 'redux-saga/effects'
import { getUserName, getChat } from './services';

function* getUserName_(action) {
    const username = yield call(getUserName, action.username);
    yield put({ type: 'SET_USERNAME', username });
}

function* getChat_(action) {
    const chatData = yield call(getChat, action.userId);
    console.log(chatData)
    yield put({ type: 'SET_CHAT', chatData });
}

export default function* sagas() {
    yield takeLatest('GET_USERNAME', getUserName_);
    yield takeLatest('GET_CHAT', getChat_);
}