import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { sendNotification } from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])

  const updateNotification = () => {
    sendNotification(
      `Update ${(100000 * Math.random()).toFixed(0)} (shows for 5 seconds)`,
      dispatch
    )
  }

  return (
    <div>
      <Notification />
      <p>
        <button onClick={updateNotification}>notification</button>
      </p>

      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />

      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
