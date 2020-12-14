import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo, resetVotesOf } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
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

  return (
    <>
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
    </>
  )
}

export default AnecdoteList
