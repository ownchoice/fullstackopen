import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    if (anecdote !== '') {
      console.log('add new anecdote', anecdote)
      event.target.anecdote.value = ''
      dispatch(addNewAnecdote(anecdote))
      sendNotification(`you added '${anecdote}'`, dispatch)
    }
  }

  return (
    <>
      <form onSubmit={createAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
