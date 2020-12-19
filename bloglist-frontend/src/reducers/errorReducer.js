// import { errorStyle } from '../components/Notification'
// import { setNotification } from './notificationReducer'

export const setError = (error) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ERROR',
      data: error,
    })
    // dispatch(setNotification(`error: ${error.response.data.error}`, errorStyle))
  }
}

const errorReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.data
    default:
      return state
  }
}

export default errorReducer
