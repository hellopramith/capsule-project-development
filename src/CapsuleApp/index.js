function CapsuleApp(currState, action) {
  
  switch(action.type) {
    case 'GET_USERNAME':
    return Object.assign({}, {
      username: action.username,
      roomId: currState.roomId || 15412514,
    })

    case 'SET_USERNAME':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: action.username,
        messages: [],
        roomId: currState.roomId || 15412514,
        currentUser : {}
      })

    case 'SET_CHAT':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: currState.username,
        currentUser: currState.currentUser,
        roomId: currState.roomId || 15412514,
        messages : action.messages
      })

    case 'SET_CURRENT_USER':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: currState.username,
        messages : currState.messages,
        roomId: currState.roomId || 15412514,
        currentUser: action.currentUser
      })

    case 'SET_CREATE_ROOM':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: currState.username,
        currentUser: currState.currentUser,
        messages: [{
          text: 'NEW ROOM',
          senderId: ''
        }],
        roomId: action.room.id
      })

    default:
      return currState;
  }
}

module.exports = CapsuleApp;