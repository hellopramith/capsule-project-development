function CapsuleApp(currState, action) {
  
  switch(action.type) {
    case 'GET_USERNAME':
    return Object.assign({}, {
      username: action.username
    })

    case 'SET_USERNAME':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: action.username,
        messages: [],
        currentUser : {}
      })

    case 'SET_CHAT':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: currState.username,
        currentUser: currState.currentUser,
        messages : action.messages
      })

    case 'SET_CURRENT_USER':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: currState.username,
        messages : currState.messages,
        currentUser: action.currentUser
      })

    default:
      return currState;
  }
}

module.exports = CapsuleApp;