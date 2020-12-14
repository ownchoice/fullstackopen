const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let updatedState
  switch (action.type) {
    case 'GOOD':
      updatedState = { ...state, good: state.good+1 }
      return updatedState
    case 'OK':
      updatedState = { ...state, ok: state.ok+1 }
      return updatedState
    case 'BAD':
      updatedState = { ...state, bad: state.bad+1 }
      return updatedState
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer