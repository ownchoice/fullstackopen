import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { errorStyle } from '../components/Notification'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const changeDetailsVisibility = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  const dispatch = useDispatch()

  const handleDeleteBlog = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(blog.id)
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification('blog deleted'))
      } catch (error) {
        dispatch(
          setNotification(`error: ${error.response.data.error}`, errorStyle)
        )
      }
    } else {
      // console.log('Deletion canceled');
    }
  }

  const handleLikeToBlog = async () => {
    // const oldBlog = await blogService.getBlogById(blog.id)
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(blog.id, newBlog)
    dispatch(updateBlog(updatedBlog))
  }

  return (
    <>
      {detailsVisibility ? (
        <li className='blog'>
          &quot;<b>{blog.title}</b>&quot; by <i>{blog.author}</i> at{' '}
          <u>{blog.url}</u> ({blog.likes} 👍){' '}
          <button onClick={handleLikeToBlog}>like</button>{' '}
          <button onClick={handleDeleteBlog}>delete</button>
          <button onClick={changeDetailsVisibility}>hide details</button>
        </li>
      ) : (
        <li className='blog'>
          &quot;<b>{blog.title}</b>&quot; by <i>{blog.author}</i>{' '}
          <button onClick={changeDetailsVisibility}>show details</button>
        </li>
      )}
    </>
  )
}

export default Blog
