import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Row, Col, ListGroup } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const compareBlogsByLikes = (a, b) => {
    return a.likes === b.likes ? 0 : a.likes > b.likes ? -1 : 1
  }

  return (
    <Row className='mt-3'>
      <Col>
        <h2>Blogs</h2>
        <ListGroup>
          {blogs.sort(compareBlogsByLikes).map((blog) => (
            <ListGroup.Item className='blog' key={blog.id}>
              <Blog key={blog.id} blog={blog} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  )
}

export default BlogList
