function CapsuleApp(currState, action) {
  
  switch(action.type) {
    case 'GET_USERNAME':
    return Object.assign({}, {
      username: action.username,
      roomId: currState.roomId || 16070852,
    })

    case 'SET_USERNAME':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: action.username,
        messages: [],
        roomId: currState.roomId || 16070852,
        currentUser : {}
      })

    case 'SET_CHAT':
      return Object.assign({}, {
        screen: currState.screen,
        username: currState.username,
        currentUser: currState.currentUser,
        roomId: currState.roomId || 16070852,
        messages : action.messages.length ? action.messages :[{
          text: 'Welcome to the new chat room -' + '',
          senderId: ''
        }]
      })
    
      case 'GET_CHAT':
      return Object.assign({}, {
        screen: currState.screen,
        username: currState.username,
        currentUser: currState.currentUser,
        roomId: action.roomId || 16070852,
        messages : currState.messages
      })

    case 'SET_CURRENT_USER':
      return Object.assign({}, {
        screen: currState.screen,
        username: currState.username,
        messages : currState.messages,
        roomId: currState.roomId || 16070852,
        currentUser: action.currentUser
      })

    case 'SET_CREATE_ROOM':
      return Object.assign({}, {
        screen: currState.screen,
        username: currState.username,
        currentUser: currState.currentUser,
        messages: [{
          text: 'Welcome to the new chat room -' + action.room.name,
          senderId: ''
        }],
        roomId: action.room.id
      })

    default:
      return currState;
  }
}

module.exports = CapsuleApp;