import { successStyle } from '../components/Notification'

let nofiticationTimer

export const setNotification = (content, style = successStyle, seconds = 3) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message: content,
      style: style,
    })
    clearTimeout(nofiticationTimer)
    nofiticationTimer = setTimeout(() => {
      dispatch(
        dispatch({
          type: 'SET_NOTIFICATION',
          message: '',
          style: style,
        })
      )
    }, seconds * 1000)
  }
}

const defaultState = { message: '', style: successStyle }

const notificationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.message, style: action.style }
    default:
      return state
  }
}

export default notificationReducer
