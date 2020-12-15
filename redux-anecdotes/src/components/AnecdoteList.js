import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addVoteTo,
  resetVotesOf,
  deleteAnecdote,
} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }

  const setToZero = (anecdote) => {
    dispatch(resetVotesOf(anecdote.id))
    dispatch(setNotification(`you have reset '${anecdote.content}'`, 3))
  }

  const removeAnecdote = (anecdote) => {
    dispatch(deleteAnecdote(anecdote.id))
    dispatch(setNotification(`you deleted '${anecdote.content}'`, 3))
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
