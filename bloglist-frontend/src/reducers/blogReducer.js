import blogService from '../services/blogs'
// import { setError } from './errorReducer'
import { errorStyle } from '../components/Notification'
import { setNotification } from './notificationReducer'

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG': {
      // throw new Error('Not implemented')
      const idToRemove = action.data
      const newBlogArray = state.filter((blog) => blog.id !== idToRemove)
      return newBlogArray
    }
    case 'UPDATE_BLOG': {
      // throw new Error('Not implemented')
      const updatedBlog = action.data
      const newBlogArray = state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      return newBlogArray
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    blogService.getAll().then((blogs) =>
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
    )
  }
}

// const newBlog = await blogService.create(blog)
export const addBlog = (blog) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_BLOG',
      data: blog,
    })
  }
}

// const updatedBlog = await blogService.update(blog.id, blog)
export const updateBlog = (blog) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog,
    })
  }
}

// const oldBlog = await blogService.getBlogById(id)
// const newBlog = { ...oldBlog, likes: oldBlog.likes + likesToAdd }
// const updatedBlog = await blogService.update(id, newBlog)
// export const addLikesToBlog = (blog) => {
//   return async (dispatch) => {
//     dispatch({
//       type: 'UPDATE_BLOG',
//       data: blog,
//     })
//   }
// }

// await blogService.deleteBlog(id)
export const deleteBlog = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}

// I don't like to set the notifications right here, but its a mess with promise error handling
// I don't know how to handle promise errors inside the returned async function

export const addBlogWithNotif = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'ADD_BLOG',
        data: newBlog,
      })
      dispatch(setNotification('blog added successfully'))
    } catch (error) {
      // dispatch({
      //   type: 'SET_ERROR',
      //   data: error,
      // })
      // dispatch(setError(error.response.data.error))
      dispatch(
        setNotification(`error: ${error.response.data.error}`, errorStyle)
      )
    }
  }
}

export const updateBlogWithNotif = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog,
      })
      dispatch(setNotification('blog updated successfully'))
    } catch (error) {
      dispatch(
        setNotification(`error: ${error.response.data.error}`, errorStyle)
      )
    }
  }
}

export const addLikesToBlogWithNotif = (id, likesToAdd = 1) => {
  return async (dispatch) => {
    try {
      const oldBlog = await blogService.getBlogById(id)
      const newBlog = { ...oldBlog, likes: oldBlog.likes + likesToAdd }
      const updatedBlog = await blogService.update(id, newBlog)

      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog,
      })
      dispatch(setNotification('liked added successfully'))
    } catch (error) {
      dispatch(
        setNotification(`error: ${error.response.data.error}`, errorStyle)
      )
    }
  }
}

export const deleteBlogWithNotif = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id,
      })
      dispatch(setNotification('liked added successfully'))
    } catch (error) {
      dispatch(
        setNotification(`error: ${error.response.data.error}`, errorStyle)
      )
    }
  }
}

export default notificationReducer
