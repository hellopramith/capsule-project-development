import axios from 'axios';
import Chatkit from '@pusher/chatkit';

export function getUserName(username) {
    return axios.post('http://localhost:3001/users',{ username }).then(result => new Promise((resolve, reject) => {
        resolve(username);
    })).catch(error => {return username})
}

export function getChat(username) {
    let currState = {}
    
    const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:4b9830d2-44d5-464b-8a84-225ed473b5ba',
        userId: username,
        tokenProvider: new Chatkit.TokenProvider({
            url: 'http://localhost:3001/authenticate'
        })
    })

    return chatManager.connect().then(currentUser => new Promise((resolve, reject) => {
        return currentUser.fetchMessages({
            roomId: 15412514,
            direction: 'older',
            limit: 100,
        })
        .then(messages => new Promise((resolve, reject) => {
            currState.messages = messages;
            console.log(currState);
            //return currState;
            resolve(currState);
        })).catch(err => {
            console.log(`Error fetching messages: ${err}`)
        })
        resolve(currState);
    })).catch(error => console.error('error', error))



    // chatManager.fetchMessages({
    //     roomId: 15412514,
    //     direction: 'older',
    //     limit: 10,
    //   })
    //     .then(messages => {
    //       console.log(messages)
    //     })
    //     .catch(err => {
    //       console.log(`Error fetching messages: ${err}`)
    //     })

    //  chatManager.connect()
    //   .then(currentUser => new Promise(
    //     (resolve, reject) => {
    //         currState.currentUser = currentUser
            
    //           currentUser.subscribeToRoom({
    //             roomId: 15412514,
    //             messageLimit: 100,
    //             hooks: {
    //                 onNewMessage: message => {
    //                     currState.messages = [...currState.messages, message]
    //                 },
    //                 onUserCameOnline: () => this.forceUpdate(),
    //                 onUserWentOffline: () => this.forceUpdate(),
    //                 onUserJoined: () => this.forceUpdate()
    //             }
    //             })
    //             console.log(currentUser)
    //     }))
                
            
            

            
        //  currentUser.subscribeToRoom({
        //   roomId: 15412514,
        //   messageLimit: 100,
        //   hooks: {
        //     onNewMessage: message => {
        //         currState.messages = [...currState.messages, message]
        //     },
        //     onUserCameOnline: () => this.forceUpdate(),
        //     onUserWentOffline: () => this.forceUpdate(),
        //     onUserJoined: () => this.forceUpdate()
        //   }
        // }).then( (currentUser) => {
        //   currState.currentUser = [...currState.currentUser, currentUser];
        // })
      //})
      //.catch(error => console.error('error', error))

}