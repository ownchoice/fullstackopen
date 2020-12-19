import React, { useEffect } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, initializeBlogs } from '../reducers/blogReducer'

const BlogView = (props) => {
  // const [blog, setBlog] = useState(null)
  const dispatch = useDispatch()
  const id = useParams().id
  // console.log(id)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  // console.log(blogs)
  const blog = blogs.find((blog) => blog.id === id)
  // console.log(blog)

  // useEffect(() => {
  //   const getBlogInfo = async () => {
  //     const blog = await blogService.getBlogById(id)
  //     setBlog(blog)
  //   }
  //   getBlogInfo()
  // }, [id])

  const handleLikeToBlog = async () => {
    // const oldBlog = await blogService.getBlogById(blog.id)
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(blog.id, newBlog)
    // console.log('TEST')
    // console.log(blog)
    // console.log(updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }

  return (
    <div>
      {blog === null || blog === undefined ? (
        <p>Blog not found</p>
      ) : (
        <div>
          <h2>
            "{blog.title}" by {blog.author}
          </h2>
          <p>
            <a href={blog.url} target='_blank' rel='noopener noreferrer'>
              {blog.url}
            </a>
          </p>
          <p>
            {blog.likes} likes <button onClick={handleLikeToBlog}>like</button>
          </p>
          <p>Added by {blog.user.name}</p>
        </div>
      )}
    </div>
  )
}

export default BlogView
