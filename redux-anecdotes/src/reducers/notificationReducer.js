const notificationReducer = (state = 'No message', action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const nofiticationChange = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: message,
  }
}

export default notificationReducer