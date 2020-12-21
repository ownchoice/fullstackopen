import React from 'react'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand as={Link} to='/'>
        Bloglist
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link as={Link} to='/'>
          Home
        </Nav.Link>
        <Nav.Link as={Link} to='/users'>
          Users
        </Nav.Link>
        <Nav.Link as={Link} to='/blogs'>
          Blogs
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Navigation
