import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogList }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogList.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default BlogList
