import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <Row>
      <Col>
        <div style={hideWhenVisible}>
          <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <Button onClick={toggleVisibility} className='my-2'>cancel</Button>
        </div>
      </Col>
    </Row>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
