function CapsuleApp(currState, action) {
  
  switch(action.type) {
    case 'GET_USERNAME':
    return Object.assign({}, {
      username: action.username,
      roomId: currState.roomId,
    })

    case 'SET_USERNAME':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: action.username,
        roomId: currState.roomId,
        currentUser : {}
      })

    case 'SET_CURRENT_USER':
      return Object.assign({}, {
        screen: currState.screen,
        username: currState.username,
        roomId: currState.roomId,
        currentUser: action.currentUser
      })

    case 'SET_CREATE_ROOM':
      return Object.assign({}, {
        screen: currState.screen,
        username: currState.username,
        currentUser: currState.currentUser,
        roomId: action.room.id
      })

    case 'UPDATE_ROOM_ID':
      return Object.assign({}, {
        screen: currState.screen,
        username: currState.username,
        roomId: action.roomId,
        currentUser: currState.currentUser
      })

    default:
      return currState;
  }
}

module.exports = CapsuleApp;