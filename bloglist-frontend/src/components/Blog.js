import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { errorStyle } from '../components/Notification'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { Button } from 'react-bootstrap'

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
        <>
          &quot;<b>{blog.title}</b>&quot; by <i>{blog.author}</i> at{' '}
          <u>{blog.url}</u> ({blog.likes} 👍)
          <Button onClick={handleLikeToBlog} className='mx-1'>like</Button>
          <Button onClick={handleDeleteBlog} className='mx-1'>delete</Button>
          <Button onClick={changeDetailsVisibility} className='mx-1'>hide details</Button>
        </>
      ) : (
        <>
          &quot;<b>{blog.title}</b>&quot; by <i>{blog.author}</i>
          <Button onClick={changeDetailsVisibility} className='mx-1'>show details</Button>
        </>
      )}
    </>
  )
}

export default Blog
