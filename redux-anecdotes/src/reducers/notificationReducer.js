const notificationReducer = (state = '', action) => {
  // console.log(action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message,
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    message: '',
  }
}

let timer

const clearNotificationContent = (dispatch) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    dispatch(removeNotification())
  }, 5000)
}

export const sendNotification = (message, dispatch) => {
  dispatch(setNotification(message))
  clearNotificationContent(dispatch)
}

export default notificationReducer
