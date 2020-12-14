import React, { useState, useEffect } from 'react'
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

    // this will clear Timeout when component unmount like in willComponentUnmount
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
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      sendNotification('login successful', successStyle)
    } catch (error) {
      console.log(error.response.data.error)
      sendNotification(
        `wrong credentials: ${error.response.data.error}`,
        errorStyle
      )
    }
  }

  const logoutUser = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    sendNotification('logged out', successStyle)
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
      <AddBlogForm addBlog={addBlog} />
    </Togglable>
  )

  const addBlog = async (blogObj) => {
    try {
      await blogService.create(blogObj)
      getBlogs()
      sendNotification('blog added', successStyle)
    } catch (error) {
      console.log(error.response.data.error)
      sendNotification(`error: ${error.response.data.error}`, errorStyle)
    }
  }

  const updateBlog = async (id, blogObj) => {
    try {
      await blogService.update(id, blogObj)
      getBlogs()
      sendNotification('blog updated', successStyle)
    } catch (error) {
      console.log(error.response.data.error)
      sendNotification(`error: ${error.response.data.error}`, errorStyle)
    }
  }

  const deleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id)
        getBlogs()
        sendNotification('blog deleted', successStyle)
      } catch (error) {
        console.log(error.response.data.error)
        sendNotification(`error: ${error.response.data.error}`, errorStyle)
      }
      // console.log('Deletion completed.');
    } else {
      // console.log('Deletion canceled');
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

      {addNewBlogForm()}
    </div>
  )

  const compareBlogsByLikes = (a, b) => {
    return a.likes === b.likes ? 0 : a.likes > b.likes ? -1 : 1
  }
  const blogList = () => (
    <BlogList
      blogList={blogs.sort(compareBlogsByLikes)}
      updateBlog={updateBlog}
      deleteBlog={deleteBlog}
    />
  )

  return (
    <>
      <Notification message={notificationMessage} style={notificationStyle} />
      {user === null ? loginForm() : blogsForm()}
      {blogList()}
    </>
  )
}

export default App
