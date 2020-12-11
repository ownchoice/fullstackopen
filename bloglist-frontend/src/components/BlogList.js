import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogList, updateBlog, deleteBlog }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogList.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      ))}
    </>
  )
}

export default BlogList
