import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'

const BlogView = () => {
  const [blog, setBlog] = useState(null)
  const id = useParams().id

  useEffect(() => {
    const getBlogInfo = async () => {
      const user = await blogService.getBlogById(id)
      setBlog(user)
    }
    getBlogInfo()
  }, [id])

  return (
    <div>
      {blog === null ? (
        <p>Blog not found</p>
      ) : (
        <div>
          <h2>
            {blog.title} by {blog.author}
          </h2>
          <p>
            <a href={blog.url} target='_blank' rel='noopener noreferrer'>
              {blog.url}
            </a>
          </p>
          <p>
            {blog.likes} likes <button>like</button>
          </p>
          <p>Added by {blog.user.name}</p>
        </div>
      )}
    </div>
  )
}

export default BlogView
