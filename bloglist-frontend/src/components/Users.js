import React, { useState, useEffect } from 'react'
import userService from '../services/user'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const users = await userService.getAll()
      console.log(users)
      setUsers(users)
    }
    getUsers()
  }, [])

  return (
    <div>
      <h2 className='mb-3'>Users</h2>
      {users.length === 0 ? (
        <p>There was a problem loading the users.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>
                <b>User</b>
              </td>
              <td>
                <b>Blogs added</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default Users
