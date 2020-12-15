let nofiticationTimer

export const setNotification = (content, seconds) => {
  console.log('uno')
  return async (dispatch) => {
    console.log('dos')
    dispatch({
      type: 'SET_NOTIFICATION',
      message: content,
    })
    clearTimeout(nofiticationTimer)
    nofiticationTimer = setTimeout(() => {
      dispatch(
        dispatch({
          type: 'SET_NOTIFICATION',
          message: '',
        })
      )
    }, seconds * 1000)
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export default notificationReducer
