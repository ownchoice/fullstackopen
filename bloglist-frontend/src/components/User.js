import React, { useState, useEffect } from 'react'
import userService from '../services/user'
import { useParams } from 'react-router-dom'

const User = (props) => {
  const [user, setUser] = useState(null)
  const id = useParams().id

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await userService.getUserById(id)
      // console.log(user)
      setUser(user)
    }
    getUserInfo()
  }, [id])

  return (
    <div>
      <h2>User info</h2>
      <div>
        {user === null ? (
          <p>User not found</p>
        ) : (
          <>
            <h3>{user.name}</h3>
            <ul>
              {user.blogs.length === 0 ? (
                <p>No blogs added</p>
              ) : (
                user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default User
