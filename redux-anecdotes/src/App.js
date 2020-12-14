import React from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { nofiticationChange } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const setNotification = () => {
    dispatch(
      nofiticationChange(
        `Message updated! ${(100000 * Math.random()).toFixed(0)}`
      )
    )
  }

  return (
    <div>
      <Notification />
      <p>
        <button onClick={setNotification}>notification</button>
      </p>

      <h2>Anecdotes</h2>
      <AnecdoteList />

      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
