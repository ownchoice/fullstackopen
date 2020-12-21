import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import { successStyle, errorStyle } from './Notification'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { setUser as setUserRedux, removeUser } from '../reducers/userReducer'
import { Button, Row, Col } from 'react-bootstrap'

const Header = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const sendNotification = (message, style = successStyle, seconds = 3) => {
    dispatch(setNotification(message, style, seconds))
  }

  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserRedux(user))
      // setUser(user)
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      // setUser(user)
      dispatch(setUserRedux(user))
      setUsername('')
      setPassword('')
      sendNotification('login successful')
    } catch (error) {
      console.log(error.response.data.error)
      sendNotification(
        `wrong credentials: ${error.response.data.error}`,
        errorStyle
      )
    }
  }

  const logoutUser = () => {
    // setUser(null)
    dispatch(removeUser())
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    sendNotification('logged out')
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const loggedUser = () => (
    <div>
      logged in as <b>{user.username}</b>{' '}
      <Button
        onClick={() => {
          logoutUser()
        }}
      >
        logout
      </Button>
    </div>
  )

  return (
    <header>
      <Row className='py-2'>
        <Col>{user === null ? loginForm() : loggedUser()}</Col>
      </Row>
    </header>
  )
}

export default Header
