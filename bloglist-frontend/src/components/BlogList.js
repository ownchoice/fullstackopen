import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ updateBlog, deleteBlog }) => {
  const blogs = useSelector((state) => state.blogs)

  const compareBlogsByLikes = (a, b) => {
    return a.likes === b.likes ? 0 : a.likes > b.likes ? -1 : 1
  }

  return (
    <>
      <h2>blogs</h2>
      <ul>
        {blogs.sort(compareBlogsByLikes).map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  )
}

export default BlogList
