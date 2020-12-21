import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { Switch, Route } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Footer from './components/Footer'
import Header from './components/Header'
import BlogView from './components/BlogView'
import BlogListView from './components/BlogListView'

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
    <div className="container">
      <Notification />
      <Header />
      <Switch>
        <Route path='/blogs/:id'>
          <BlogView />
        </Route>
        <Route path='/blogs'>
          {/* <Redirect to='/' /> */}
          <BlogListView />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <div>{user === null ? null : addNewBlogForm()}</div>
          <BlogList />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
