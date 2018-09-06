function CapsuleApp(currState, action) {
  
  switch(action.type) {
    case 'GET_USERNAME':
      return currState = [...currState.username, action.username]

    case 'SET_USERNAME':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: action.username,
        messages: [],
        currentUser : {}
      })

    case 'SET_CHAT':
      // console.log(action.chatData.messages)
      // currState.messages = action.chatData.messages;
      // currState.currentUser = action.chatData.currentUser;
      // console.log(currState)
      // currState.messages = currState.messages || [];
      // currState.currentUser = currState.currentUser || {};
      // currState.screen= 'ChattingSection'
      // action.connect.connect()
      //   .then(currentUser => {
      //     currentUser.subscribeToRoom({
      //       roomId: 15412514,
      //       messageLimit: 100,
      //       hooks: {
      //         onNewMessage: message => {
      //           currState.messages = [...currState.messages, message]
      //         },
      //         onUserCameOnline: () => this.forceUpdate(),
      //         onUserWentOffline: () => this.forceUpdate(),
      //         onUserJoined: () => this.forceUpdate()
      //       }
      //     }).then( (currentUser) => {
      //       currState.currentUser = [...currState.currentUser, currentUser];
            
      //       return currState;
      //     })
      //   })
      //   .catch(error => console.error('error', error))

    default:
      return currState;
  }
}

module.exports = CapsuleApp;