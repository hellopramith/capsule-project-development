import axios from 'axios';
import Chatkit from '@pusher/chatkit';

export function getUserName(username) {
    return axios.post(window.location.protocol + '//' + window.location.hostname + ':3001/users',{ username }).then(result => new Promise((resolve, reject) => {
        resolve(username);
    })).catch(error => {return username})
}

export function getChat(action) {
    return action.currentUser.fetchMessages({
        roomId: action.roomId,
        direction: 'older',
        limit: 10,
    })
    .then(messages => new Promise((resolve, reject) => {
        resolve(messages)
    })
    .catch(err => {
        console.log(`Error fetching messages: ${err}`)
    }))
}

export function getCreateRoom(action) {
    return action.currentUser.createRoom({
        name: action.roomName,
        private: true
    })
    .then(room => new Promise((resolve, reject) => {
        alert(`Created room called ${room.name}`);
        resolve(room)
    })
    .catch(err => {
        console.log(`Error craeting room: ${err}`)
    }))
}

export function getCurrentUser(username) {
    return new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:4b9830d2-44d5-464b-8a84-225ed473b5ba',
        userId: username,
        tokenProvider: new Chatkit.TokenProvider({
            url: window.location.protocol + '//' +  window.location.hostname + ':3001/authenticate'
        })
    }).connect().then(currentUser => new Promise((resolve, reject) => {
        resolve(currentUser)
    })).catch(error => console.error('error', error))
}