export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

export const removeUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_USER',
    })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export default userReducer
