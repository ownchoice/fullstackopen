import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Footer from './components/Footer'
import Header from './components/Header'
import BlogView from './components/BlogView'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  // const [usersToShow, setUsersToShow] = useState([])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const addBlogFormRef = React.createRef()
  const addNewBlogForm = () => (
    <Togglable buttonLabel='add blog' ref={addBlogFormRef}>
      <AddBlogForm />
    </Togglable>
  )

  // const match = useRouteMatch('/users/:id')
  // const userToShow = match
  //   ? usersToShow.find((user) => user.id === Number(match.params.id))
  //   : null

  return (
    <>
      <Notification />
      <Header />
      <Switch>
        <Route path='/blogs/:id'>
          <BlogView />
        </Route>
        <Route path='/blogs'>
          <Redirect to='/' />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <p>{user === null ? null : addNewBlogForm()}</p>
          <BlogList />
        </Route>
      </Switch>
      <Footer />
    </>
  )
}

export default App
