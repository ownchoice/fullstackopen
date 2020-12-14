import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo, resetVotesOf } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
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
            <button
              onClick={() => {
                vote(anecdote.id)
                sendNotification(`you voted '${anecdote.content}'`, dispatch)
              }}
            >
              vote
            </button>
            <button onClick={() => {setToZero(anecdote.id)
            sendNotification(`you have reset '${anecdote.content}'`, dispatch)}}>reset</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
