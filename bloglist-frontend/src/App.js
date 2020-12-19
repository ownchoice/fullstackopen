import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification, {
  successStyle,
  errorStyle,
} from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser as setUserRedux, removeUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const sendNotification = (message, style = successStyle, seconds = 3) => {
    dispatch(setNotification(message, style, seconds))
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserRedux(user))
      // setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const addBlogFormRef = React.createRef()
  const addNewBlogForm = () => (
    <Togglable buttonLabel='add blog' ref={addBlogFormRef}>
      <AddBlogForm />
    </Togglable>
  )

  const blogsForm = () => (
    <div>
      <div>
        logged in as <b>{user.username}</b>{' '}
        <button
          onClick={() => {
            logoutUser()
          }}
        >
          logout
        </button>
      </div>
      <hr />

      {addNewBlogForm()}
    </div>
  )

  const blogList = () => <BlogList />

  return (
    <>
      <Notification />
      {user === null ? loginForm() : blogsForm()}
      {blogList()}
    </>
  )
}

export default App
