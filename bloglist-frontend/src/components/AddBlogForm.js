import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { errorStyle } from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const AddBlogForm = (props) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')
  // const errorState = useSelector((state) => state.error)
  const dispatch = useDispatch()

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    try {
      const createdBlog = await blogService.create(newBlog)
      dispatch(addBlog(createdBlog))
      dispatch(setNotification('blog added'))
      resetTitle()
      resetAuthor()
      resetUrl()
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
          title: <input id='title' name='Title' {...title} />
        </div>
        <div>
          author: <input id='author' name='Author' {...author} />
        </div>
        <div>
          url: <input id='url' name='URL' {...url} />
        </div>
        <button type='submit' id='submit-button'>
          add
        </button>
      </form>
    </div>
  )
}

export default AddBlogForm
