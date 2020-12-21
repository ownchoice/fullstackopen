import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogListView = (props) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      console.log(blogs)
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  return (
    <div>
      <h2 className='mb-3'>Blogs</h2>
      {blogs.length === 0 ? (
        <p>There was a problem loading the blogs.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>
                <b>Blog title</b>
              </td>
              <td>
                <b>Author</b>
              </td>
              <td>
                <b>Likes</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
                <td>{blog.likes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default BlogListView
