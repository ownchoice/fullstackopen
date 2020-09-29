import React from 'react'

const Notification = ({ message, style, show }) => {
  if (message === null || message === '') {
    return null
  }
  return(
    <div style={style}>{message}</div>
  )
}

export default Notification