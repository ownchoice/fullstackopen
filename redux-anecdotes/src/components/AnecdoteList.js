import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo, resetVotesOf } from '../reducers/anecdoteReducer'
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
    // console.log('vote', anecdote.id)
    dispatch(addVoteTo(anecdote.id))
    sendNotification(`you voted '${anecdote.content}'`, dispatch)
  }

  const setToZero = (anecdote) => {
    // console.log('reset to zero votes', anecdote.id)
    dispatch(resetVotesOf(anecdote.id))
    sendNotification(`you have reset '${anecdote.content}'`, dispatch)
  }

  const deleteAnecdote = (anecdote) => {
    console.log('delete', anecdote)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => vote(anecdote)}>vote</button>{' '}
            <button onClick={() => setToZero(anecdote)}>reset votes</button>{' '}
            <button onClick={() => deleteAnecdote(anecdote)}>delete</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
