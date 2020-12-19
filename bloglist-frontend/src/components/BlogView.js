import React, { useEffect } from 'react'
import blogService from '../services/blogs'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, initializeBlogs } from '../reducers/blogReducer'
import AddCommentForm from './AddCommentForm'

const BlogView = (props) => {
  const dispatch = useDispatch()
  const id = useParams().id

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  const handleLikeToBlog = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(blog.id, newBlog)
    dispatch(updateBlog(updatedBlog))
  }

  const getDateAsString = (date) => {
    const strDay = date.toString('yyyy-MM-dd').substr(0, 10)
    const strHour = date.toString('yyyy-MM-dd').substr(11, 8)
    return `${strDay} ${strHour}`
  }

  return (
    <div>
      {blog === null || blog === undefined ? (
        <p>Blog not found</p>
      ) : (
        <div>
          <h2>
            "<span id='blog-title'>{blog.title}</span>" by{' '}
            <span id='blog-author'>{blog.author}</span>
          </h2>
          <p>
            <a href={blog.url} target='_blank' rel='noopener noreferrer'>
              <span id='blog-url'>{blog.url}</span>
            </a>
          </p>
          <p>
            <span id='blog-likes'>{blog.likes}</span> likes{' '}
            <button onClick={handleLikeToBlog}>like</button>
          </p>
          <p>
            Added by{' '}
            <i>
              <Link to={`/users/${blog.user.id}`}>
                <span id='blog-user'>{blog.user.name}</span>
              </Link>
            </i>
          </p>
          <h3>Comments</h3>
          <div>
            <AddCommentForm idBlog={blog.id} />
          </div>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>
                {/* "{comment.body}" at <i>{comment.date.toString('yyyy-MM-dd')}</i> */}
                "<span className='comment-body'>{comment.body}</span>" at{' '}
                <span className='comment-date'>{getDateAsString(comment.date)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BlogView
