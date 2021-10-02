import React from 'react'
import PropTypes from 'prop-types'

const Header = (props: Props) => {
  return <h1>{props.name}</h1>
}

interface Props {
  name: string
}

Header.propTypes = {
  name: PropTypes.string,
}

export default Header
