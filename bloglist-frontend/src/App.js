import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import Notification, {
  successStyle,
  errorStyle,
} from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const getBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationStyle, setNotificationStyle] = useState(successStyle)
  const [notificationLastUpdate, setLastUpdate] = useState(Date.now())

  const notificationUpdate = () => {
    const timer = setTimeout(() => {
      setNotificationMessage('')
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }
  useEffect(notificationUpdate, [notificationLastUpdate])

  const sendNotification = (message, style) => {
    setNotificationStyle(style)
    setNotificationMessage(message)
    setLastUpdate(Date.now())
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with', username, password)
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      sendNotification('login successful', successStyle)
    } catch (error) {
      console.log(error)
      sendNotification('wrong credentials', errorStyle)
    }
  }

  const logoutUser = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    sendNotification('logged out', successStyle)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const addBlog = async (title, author, url) => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      getBlogs()
      sendNotification('blog added', successStyle)
    } catch (error) {
      sendNotification(`error ${error}`, errorStyle)
    }
  }

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
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <AddBlogForm addBlog={addBlog} />
    </div>
  )

  return (
    <>
      <Notification message={notificationMessage} style={notificationStyle} />
      {user == null ? loginForm() : blogsForm()}
    </>
  )
}

export default App
