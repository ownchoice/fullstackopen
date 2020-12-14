import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addVoteTo,
  resetVotesOf,
  deleteAnecdote,
} from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'ALL') {
      return anecdotes
    } else {
      return anecdotes.filter((anecdote) => anecdote.content.includes(filter))
    }
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVoteTo(anecdote.id))
    sendNotification(`you voted '${anecdote.content}'`, dispatch)
  }

  const setToZero = (anecdote) => {
    dispatch(resetVotesOf(anecdote.id))
    sendNotification(`you have reset '${anecdote.content}'`, dispatch)
  }

  const removeAnecdote = (anecdote) => {
    dispatch(deleteAnecdote(anecdote.id))
    sendNotification(`you deleted '${anecdote.content}'`, dispatch)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => vote(anecdote)}>vote</button>{' '}
            <button onClick={() => setToZero(anecdote)}>zero</button>{' '}
            <button onClick={() => removeAnecdote(anecdote)}>delete</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
