import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { errorStyle } from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { Button, Form } from 'react-bootstrap'

const AddBlogForm = (props) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')
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
      // console.log(createdBlog)
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
    <>
      <h2>Add a new blog</h2>
      <Form onSubmit={handleBlogSubmit} id='add-blog-form'>
        <Form.Group controlId='blogTitle'>
          title: <input id='title' name='Title' {...title} />
        </Form.Group>
        <Form.Group controlId='blogAuthor'>
          author: <input id='author' name='Author' {...author} />
        </Form.Group>
        <Form.Group controlId='blogUrl'>
          url: <input id='url' name='URL' {...url} />
        </Form.Group>
        <Button type='submit' id='submit-button'>
          add
        </Button>
      </Form>
    </>
  )
}

export default AddBlogForm
