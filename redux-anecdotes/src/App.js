import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addVoteTo,
  resetVotesOf,
  addNewAnecdote,
} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVoteTo(id))
  }

  const setToZero = (id) => {
    console.log('reset to zero votes', id)
    dispatch(resetVotesOf(id))
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    if (anecdote !== '') {
      console.log('add new anecdote', anecdote)
      event.target.anecdote.value = ''
      dispatch(addNewAnecdote(anecdote))
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            <button onClick={() => setToZero(anecdote.id)}>reset</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
