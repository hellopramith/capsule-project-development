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
    return Object.assign({}, {
      screen: 'ChattingSection',
      username: currState.username,
      currentUser : action.chatData
    })

    default:
      return currState;
  }
}

module.exports = CapsuleApp;