const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

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

export const addVoteTo = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

export const resetVotesOf = (id) => {
  return {
    type: 'ZERO',
    data: { id },
  }
}

export const addNewAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    data: { anecdote },
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'RESET_ALL':
      return initialState.sort(compareVotes)
    case 'ZERO': {
      const id = action.data.id
      const anecdoteToChange = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: 0,
      }
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort(compareVotes)
    }
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort(compareVotes)
    }
    case 'ADD':
      return state
        .concat({
          content: action.data.anecdote,
          id: getId(),
          votes: 0,
        })
        .sort(compareVotes)
    default:
      return state.sort(compareVotes)
  }
}

export default reducer
