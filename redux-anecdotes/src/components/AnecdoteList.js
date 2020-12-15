import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import {
  addVoteTo,
  resetVotesOf,
  deleteAnecdote,
} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const dispatch = useDispatch()

  // const anecdotes = useSelector(({ anecdotes, filter }) => {
  //   if (filter === 'ALL') {
  //     return anecdotes
  //   } else {
  //     return anecdotes.filter((anecdote) => anecdote.content.includes(filter))
  //   }
  // })

  const vote = (anecdote) => {
    props.addVoteTo(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 3)
  }

  const setToZero = (anecdote) => {
    props.resetVotesOf(anecdote.id)
    props.setNotification(`you have reset '${anecdote.content}'`, 3)
  }

  const removeAnecdote = (anecdote) => {
    props.deleteAnecdote(anecdote.id)
    props.setNotification(`you deleted '${anecdote.content}'`, 3)
  }

  return (
    <>
      {props.notes.map((anecdote) => (
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

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return { notes: state.anecdotes }
  } else {
    return {
      notes: state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(state.filter)
      ),
    }
  }
}

const mapDispatchToProps = {
  addVoteTo,
  resetVotesOf,
  deleteAnecdote,
  setNotification,
}

// export default AnecdoteList
const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes
