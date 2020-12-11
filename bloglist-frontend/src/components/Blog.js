import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const changeDetailsVisibility = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  const printBlogObj = () => {
    console.log(blog)
  }

  const addLikeToBlog = () => {
    updateBlog(blog.id, {...blog, likes: blog.likes+1})
  }

  return (
    <div>
      {/* <button onClick={printBlogObj}>print</button>{' '} */}
      {detailsVisibility ? (
        <>
          <b>{blog.title}</b> by <i>{blog.author}</i> at <u>{blog.url}</u> (
          {blog.likes} 👍) <button onClick={addLikeToBlog}>like</button>{' '}
          <button onClick={() => {deleteBlog(blog.id)}}>delete</button>
          <button onClick={changeDetailsVisibility}>hide details</button>
        </>
      ) : (
        <>
          {blog.title}{' '}
          <button onClick={changeDetailsVisibility}>show details</button>
        </>
      )}
    </div>
  )
}

export default Blog
