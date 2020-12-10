import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <b>{blog.title}</b> by <i>{blog.author}</i> at <u>{blog.url}</u>
  </div>
)

export default Blog
