import React, { useEffect } from 'react'
import blogService from '../services/blogs'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, initializeBlogs } from '../reducers/blogReducer'

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
            "<span id='comment-title'>{blog.title}</span>" by{' '}
            <span id='comment-author'>{blog.author}</span>
          </h2>
          <p>
            <a href={blog.url} target='_blank' rel='noopener noreferrer'>
              <span id='comment-url'>{blog.url}</span>
            </a>
          </p>
          <p>
            <span id='comment-likes'>{blog.likes}</span> likes{' '}
            <button onClick={handleLikeToBlog}>like</button>
          </p>
          <p>
            Added by{' '}
            <i>
              <Link to={`/users/${blog.user.id}`}>
                <span id='comment-user'>{blog.user.name}</span>
              </Link>
            </i>
          </p>
          <h3>Comments</h3>
          <ul>
            {blog.comments.map((comment) => (
              <li>
                {/* "{comment.body}" at <i>{comment.date.toString('yyyy-MM-dd')}</i> */}
                "<span id='comment-body'>{comment.body}</span>" at{' '}
                <span id='comment-date'>{getDateAsString(comment.date)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BlogView
