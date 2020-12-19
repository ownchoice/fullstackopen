import React, { useState, useEffect } from 'react'
import userService from '../services/user'

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
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>User</td>
            <td>Blogs added</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
