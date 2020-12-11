import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogList, updateBlog }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogList.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      ))}
    </>
  )
}

export default BlogList
