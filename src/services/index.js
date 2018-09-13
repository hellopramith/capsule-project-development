import axios from 'axios';
import Chatkit from '@pusher/chatkit';

export function getUserName(username) {
    return axios.post('/users',{ username }).then(result => new Promise((resolve, reject) => {
        resolve(username);
    })).catch(error => {return username})
}

export function getChat(action) {
    return action.currentUser.fetchMessages({
        roomId: action.roomId,
        direction: 'older',
        limit: 6,
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
        private: false
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
            url: '/authenticate'
        })
    }).connect().then(currentUser => new Promise((resolve, reject) => {
        if(currentUser.users.length > 0){
            resolve(currentUser)
        } else {
            currentUser.joinRoom({ roomId: 16070852 })
            .then(room => {
                console.log(`Joined room with ID: ${room.id}`)
                currentUser.messages = [{
                    text: 'Welcome to the new chat room -' + room.name,
                    senderId: ''
                }]
                resolve(currentUser)
            })
            .catch(err => {
                console.log(`Error joining room ${err}`)
            })
        }
        
    })).catch(error => console.error('error', error))
}