import React from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { errorStyle } from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const AddCommentForm = ({ idBlog }) => {
  const { reset: resetComment, ...comment } = useField('text')
  const dispatch = useDispatch()

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      await blogService.addComentToBlog(idBlog, comment.value)
      // console.log(updatedBlog)
      dispatch(initializeBlogs())
      dispatch(setNotification('blog added'))
      resetComment()
    } catch (error) {
      // console.log(error)
      dispatch(
        setNotification(`error: ${error.response.data.error}`, errorStyle)
      )
    }
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleBlogSubmit} id='add-blog-form'>
        <div>
          Comment: <input id='comment' name='Comment' {...comment} />
        </div>
        <button type='submit' id='submit-comment'>
          add comment
        </button>
      </form>
    </div>
  )
}

export default AddCommentForm
