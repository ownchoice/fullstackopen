import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationState = useSelector((state) => state.notification)
  if (notificationState.message === null || notificationState.message === '') {
    return null
  }
  return <div style={notificationState.style} id='notification'>{notificationState.message}</div>
}

const successStyle = {
  background: 'lightgreen',
  color: 'green',
  fontStyle: 'bold',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const errorStyle = {
  ...successStyle,
  color: 'red',
  background: 'lightsalmon',
}

export { successStyle, errorStyle }

export default Notification
