import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const changeDetailsVisibility = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  return (
    <>
      {detailsVisibility ? (
        <p>
          <b>{blog.title}</b> by <i>{blog.author}</i> at <u>{blog.url}</u> ({blog.likes} 👍){' '}<button>like</button>{' '}
          <button onClick={changeDetailsVisibility}>hide details</button>
        </p>
      ) : (
        <div>
          {blog.title}{' '}
          <button onClick={changeDetailsVisibility}>show details</button>
        </div>
      )}
    </>
  )
}

export default Blog
