import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    if (anecdoteContent !== '') {
      // console.log('add new anecdote', anecdoteContent)
      event.target.anecdote.value = ''
      // const newAnecdote = await anecdoteService.createNew(anecdoteContent)
      dispatch(addNewAnecdote(anecdoteContent))
      sendNotification(`you added '${anecdoteContent}'`, dispatch)
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
