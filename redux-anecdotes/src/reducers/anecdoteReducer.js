import anecdoteService from '../services/anecdotes'

const compareVotes = (a, b) => {
  // a is less than b by some ordering criterion
  if (a.votes > b.votes) {
    return -1
  }
  // a is greater than b by the ordering criterion
  if (a.votes < b.votes) {
    return 1
  }
  // a must be equal to b
  return 0
}

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addVoteTo = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVoteTo(id)
    dispatch({
      type: 'UPDATE_VOTES',
      data: updatedAnecdote,
    })
  }
}

export const resetVotesOf = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.setVotesToZero(id)
    dispatch({
      type: 'UPDATE_VOTES',
      data: updatedAnecdote,
    })
  }
}

export const deleteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.remove(id)
    dispatch({
      type: 'DELETE_ANECDOTE',
      data: { id },
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data.sort(compareVotes)
    case 'UPDATE_VOTES': {
      const id = action.data.id
      const updatedAnecdote = action.data
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote))
        .sort(compareVotes)
    }
    case 'NEW_ANECDOTE':
      return state.concat(action.data).sort(compareVotes)
    case 'DELETE_ANECDOTE':
      return state.filter((anecdote) => anecdote.id !== action.data.id).sort(compareVotes)
    default:
      return state.sort(compareVotes)
  }
}

export default anecdoteReducer
