import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const changeDetailsVisibility = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  // const printBlogObj = () => {
  //   console.log(blog)
  // }

  const addLikeToBlog = () => {
    updateBlog(blog.id, { ...blog, likes: blog.likes + 1 })
  }

  return (
    <>
      {/* <button onClick={printBlogObj}>print</button>{' '} */}
      {detailsVisibility ? (
        <li className='blog'>
          &quot;<b>{blog.title}</b>&quot; by <i>{blog.author}</i> at{' '}
          <u>{blog.url}</u> ({blog.likes} 👍){' '}
          <button onClick={addLikeToBlog}>like</button>{' '}
          <button
            onClick={() => {
              deleteBlog(blog.id)
            }}
          >
            delete
          </button>
          <button onClick={changeDetailsVisibility}>hide details</button>
        </li>
      ) : (
        <li className='blog'>
          &quot;<b>{blog.title}</b>&quot; by <i>{blog.author}</i>{' '}
          <button onClick={changeDetailsVisibility}>show details</button>
        </li>
      )}
    </>
  )
}

export default Blog
