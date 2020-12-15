import React from 'react'
import { connect } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const createAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    if (anecdoteContent !== '') {
      event.target.anecdote.value = ''
      props.addNewAnecdote(anecdoteContent)
      props.setNotification(`you added '${anecdoteContent}'`, 3)
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

const mapDispatchToProps = {
  addNewAnecdote,
  setNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
