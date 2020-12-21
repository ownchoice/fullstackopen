import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  const notificationState = useSelector((state) => state.notification)
  if (notificationState.message === null || notificationState.message === '') {
    return null
  }
  return <Alert variant={notificationState.style} id='notification' className='m-2'>{notificationState.message}</Alert>
}

// const successStyle = {
//   background: 'lightgreen',
//   color: 'green',
//   fontStyle: 'bold',
//   fontSize: 20,
//   borderStyle: 'solid',
//   borderRadius: 5,
//   padding: 10,
//   marginBottom: 10,
// }

// const errorStyle = {
//   ...successStyle,
//   color: 'red',
//   background: 'lightsalmon',
// }
const successStyle = 'success'
const errorStyle = 'danger'

export { successStyle, errorStyle }

export default Notification
