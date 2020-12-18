// const blogExample = {
//   id: 'we4f8we4ew615e',
//   title: 'Title',
//   author: 'Author',
//   url: 'https://url.com',
//   likes: 0,
//   user: {
//     id: '9er1vr1',
//     name: 'name of the user',
//     username: 'username',
//   },
// }

import blogService from '../services/blogs'

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

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    })
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}

// const addBlog = async (blogObj) => {
//   try {
//     await blogService.create(blogObj)
//     // getBlogs()
//     sendNotification('blog added')
//   } catch (error) {
//     console.log(error.response.data.error)
//     sendNotification(`error: ${error.response.data.error}`, errorStyle)
//   }
// }

// const updateBlog = async (id, blogObj) => {
//   try {
//     await blogService.update(id, blogObj)
//     // getBlogs()
//     sendNotification('blog updated')
//   } catch (error) {
//     console.log(error.response.data.error)
//     sendNotification(`error: ${error.response.data.error}`, errorStyle)
//   }
// }

// const deleteBlog = async (id) => {
//   if (window.confirm('Are you sure you want to delete this blog?')) {
//     try {
//       await blogService.deleteBlog(id)
//       // getBlogs()
//       sendNotification('blog deleted')
//     } catch (error) {
//       console.log(error.response.data.error)
//       sendNotification(`error: ${error.response.data.error}`, errorStyle)
//     }
//     // console.log('Deletion completed.');
//   } else {
//     // console.log('Deletion canceled');
//   }
// }

export default notificationReducer
