import React from 'react'

const Notification = ({ message, style }) => {
  if (message === null || message === '') {
    return null
  }
  return <div style={style} id='notification'>{message}</div>
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
