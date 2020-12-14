import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

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
