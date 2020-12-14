import React from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import {
  setNotification,
  removeNotification,
  sendNotification,
} from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const updateNotification = () => {
    sendNotification(`Update ${(100000 * Math.random()).toFixed(0)} (shows for 5 seconds)`, dispatch)
  }

  return (
    <div>
      <Notification />
      <p>
        <button onClick={updateNotification}>notification</button>
      </p>

      <h2>Anecdotes</h2>
      <AnecdoteList />

      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
