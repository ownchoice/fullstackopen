import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { Switch, Route } from 'react-router-dom'
import Users from './components/Users'
import Footer from './components/Footer'
import Header from './components/Header'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const addBlogFormRef = React.createRef()
  const addNewBlogForm = () => (
    <Togglable buttonLabel='add blog' ref={addBlogFormRef}>
      <AddBlogForm />
    </Togglable>
  )

  const blogList = () => <BlogList />

  return (
    <>
      <Notification />
      <Header />
      <Switch>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <p>{user === null ? null : addNewBlogForm()}</p>
          {blogList()}
        </Route>
      </Switch>
      <Footer />
    </>
  )
}

export default App
