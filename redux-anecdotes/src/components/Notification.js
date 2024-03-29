import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (message === null || message === '') {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return <div style={style}>{message}</div>
}

export default Notification
